/**
 * IFrameCommunication - Utility for handling communication between iframe and parent window
 */
export type MessageEventType = 'demoStarted' | 'demoEnded' | 'error' | 'resizeFrame' | 'ready';

export interface IFrameMessage {
  type: MessageEventType;
  payload?: any;
}

export class IFrameCommunication {
  private static apiKey: string | null = null;
  private static targetOrigin = '*'; // In production, specify the exact parent origin

  /**
   * Initialize the iframe communication
   */
  public static init(): void {
    // Listen for messages from parent window
    window.addEventListener('message', this.handleIncomingMessage);
    
    // Notify parent that iframe is ready
    this.sendMessage('ready');
    
    // Extract API key from URL if present
    this.apiKey = this.getApiKeyFromUrl();
  }

  /**
   * Send a message to the parent window
   */
  public static sendMessage(type: MessageEventType, payload?: any): void {
    const message: IFrameMessage = { type, payload };
    
    // Only send message if in iframe
    if (window.parent !== window) {
      window.parent.postMessage(message, this.targetOrigin);
    }
  }

  /**
   * Handle incoming messages from parent window
   */
  private static handleIncomingMessage(event: MessageEvent): void {
    const message = event.data as IFrameMessage;
    
    if (!message || typeof message !== 'object') return;
    
    console.log('Received message from parent:', message);
    
    // Handle different message types
    switch (message.type) {
      case 'resizeFrame':
        // Handle resize request
        break;
        
      default:
        // Handle other message types
        break;
    }
  }

  /**
   * Notify parent to resize the iframe
   */
  public static requestResize(height: number): void {
    this.sendMessage('resizeFrame', { height });
  }

  /**
   * Extract API key from URL parameters
   */
  private static getApiKeyFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('apiKey');
  }

  /**
   * Get the API key
   */
  public static getApiKey(): string | null {
    return this.apiKey;
  }
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  // Only initialize in browser environment
  setTimeout(() => {
    IFrameCommunication.init();
  }, 100);
}