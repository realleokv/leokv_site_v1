export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const lerp = (current: number, target: number, alpha: number) => current + (target - current) * alpha;

export function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch { return false; }
}

export function safeLink(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : undefined;
  } catch { return undefined; }
}
