/**
 * Voiceflow Chat Widget Utility
 *
 * This file provides TypeScript types and helper functions for interacting
 * with the Voiceflow chat widget programmatically.
 */

// Declare Voiceflow types for TypeScript
declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: VoiceflowConfig) => void;
        open: () => void;
        close: () => void;
        show: () => void;
        hide: () => void;
        interact: (action: VoiceflowInteraction) => void;
      };
    };
  }
}

interface VoiceflowConfig {
  verify: {
    projectID: string;
  };
  url: string;
  versionID: string;
  launch?: {
    event: {
      type: 'click' | 'load';
      payload?: Record<string, any>;
    };
  };
  render?: {
    mode: 'embedded' | 'overlay';
    target?: HTMLElement;
  };
  assistant?: {
    stylesheet?: string;
  };
}

interface VoiceflowInteraction {
  type: string;
  payload?: Record<string, any>;
}

/**
 * Open the chat widget
 */
export function openChat() {
  if (typeof window !== 'undefined' && window.voiceflow?.chat) {
    window.voiceflow.chat.open();
  }
}

/**
 * Close the chat widget
 */
export function closeChat() {
  if (typeof window !== 'undefined' && window.voiceflow?.chat) {
    window.voiceflow.chat.close();
  }
}

/**
 * Show the chat widget button
 */
export function showChat() {
  if (typeof window !== 'undefined' && window.voiceflow?.chat) {
    window.voiceflow.chat.show();
  }
}

/**
 * Hide the chat widget button
 */
export function hideChat() {
  if (typeof window !== 'undefined' && window.voiceflow?.chat) {
    window.voiceflow.chat.hide();
  }
}

/**
 * Send a custom interaction to the chat widget
 * @param action - The interaction action to send
 */
export function interactWithChat(action: VoiceflowInteraction) {
  if (typeof window !== 'undefined' && window.voiceflow?.chat) {
    window.voiceflow.chat.interact(action);
  }
}

/**
 * Check if Voiceflow is loaded and ready
 */
export function isVoiceflowReady(): boolean {
  return typeof window !== 'undefined' && !!window.voiceflow?.chat;
}
