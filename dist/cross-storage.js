class CrossStorage {
    constructor(options = {}) {
      if (!options.iframeUrl) {
        throw new Error("iframeUrl is required");
      }
  
      this.iframeUrl = options.iframeUrl;
      this.token = options.token || null;
      this.timeout = options.timeout || 5000;
      this.enableCache = options.cache !== false;
  
      this._iframe = null;
      this._origin = new URL(this.iframeUrl).origin;
  
      this._requests = new Map();
      this._queue = [];
      this._ready = false;
      this._cache = new Map();
  
      this._init();
    }
  
    // -----------------------------
    // INIT
    // -----------------------------
    _init() {
      this._iframe = document.createElement("iframe");
      this._iframe.src = this.iframeUrl;
      this._iframe.style.display = "none";
  
      document.body.appendChild(this._iframe);
  
      window.addEventListener("message", this._handleMessage.bind(this));
  
      this._iframe.onload = () => {
        this._ready = true;
        this._flushQueue();
      };
    }
  
    _flushQueue() {
      this._queue.forEach(fn => fn());
      this._queue = [];
    }
  
    // -----------------------------
    // MESSAGE HANDLER
    // -----------------------------
    _handleMessage(event) {
      if (event.origin !== this._origin) return;
  
      const { id, result } = event.data || {};
      if (!this._requests.has(id)) return;
  
      const { resolve } = this._requests.get(id);
  
      const parsed = this._deserialize(result);
  
      resolve(parsed);
      this._requests.delete(id);
    }
  
    // -----------------------------
    // SERIALIZATION
    // -----------------------------
    _serialize(value) {
      try {
        return JSON.stringify(value);
      } catch {
        return value;
      }
    }
  
    _deserialize(value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  
    // -----------------------------
    // CORE SEND
    // -----------------------------
    _send(action, key, value) {
      return new Promise((resolve, reject) => {
        const exec = () => {
          const id = Math.random().toString(36).slice(2);
  
          this._requests.set(id, { resolve });
  
          this._iframe.contentWindow.postMessage(
            {
              id,
              action,
              key,
              value: this._serialize(value),
              token: this.token
            },
            this._origin
          );
  
          setTimeout(() => {
            if (this._requests.has(id)) {
              this._requests.delete(id);
              reject("CrossStorage timeout");
            }
          }, this.timeout);
        };
  
        if (!this._ready) {
          this._queue.push(exec);
        } else {
          exec();
        }
      });
    }
  
    // -----------------------------
    // PUBLIC API
    // -----------------------------
    async get(key) {
      if (this.enableCache && this._cache.has(key)) {
        return this._cache.get(key);
      }
  
      const value = await this._send("get", key);
  
      if (this.enableCache) {
        this._cache.set(key, value);
      }
  
      return value;
    }
  
    async set(key, value) {
      const res = await this._send("set", key, value);
  
      if (this.enableCache) {
        this._cache.set(key, value);
      }
  
      return res;
    }
  
    async remove(key) {
      const res = await this._send("remove", key);
  
      if (this.enableCache) {
        this._cache.delete(key);
      }
  
      return res;
    }
  
    async clear() {
      const res = await this._send("clear");
  
      if (this.enableCache) {
        this._cache.clear();
      }
  
      return res;
    }
  
    // -----------------------------
    // DESTROY (cleanup)
    // -----------------------------
    destroy() {
      if (this._iframe && this._iframe.parentNode) {
        this._iframe.parentNode.removeChild(this._iframe);
      }
  
      window.removeEventListener("message", this._handleMessage);
  
      this._requests.clear();
      this._cache.clear();
      this._queue = [];
      this._ready = false;
    }
  }
  
  
  // -----------------------------
  // EXPORTS
  // -----------------------------
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CrossStorage;
  } else {
    window.CrossStorage = CrossStorage;
  }