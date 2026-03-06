export interface TourStep {
  target: string;
  title: string;
  desc: string;
  cta?: string;
  icon?: string;
  tooltip?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  padding?: number;
  borderRadius?: string;
  action?: (target: HTMLElement, event: MouseEvent) => void;
}

export interface TourOptions {
  onComplete?: () => void;
  onSkip?: () => void;
  storageKey?: string;
}

export class TourEngine {
  private steps: TourStep[];
  private current: number = -1;
  public active: boolean = false;
  private onComplete: () => void;
  private onSkip: () => void;
  private storageKey: string;

  private $overlay: HTMLElement | null = null;
  private $hole: HTMLElement | null = null;
  private $tooltip: HTMLElement | null = null;
  private $backdrop: HTMLElement | null = null;
  private _currentTarget: HTMLElement | null = null;
  private _currentHandler: ((e: MouseEvent) => void) | null = null;

  constructor(steps: TourStep[], options: TourOptions = {}) {
    this.steps = steps;
    this.onComplete = options.onComplete || (() => {});
    this.onSkip = options.onSkip || (() => {});
    this.storageKey = options.storageKey || 'tour_done';
    this._onResize = this._onResize.bind(this);
  }

  start() {
    if (localStorage.getItem(this.storageKey)) return;
    this.forceStart();
  }

  forceStart() {
    this.active = true;
    this.current = 0;
    this._buildDOM();
    this._applyStep(0);
    window.addEventListener('resize', this._onResize);
  }

  private _buildDOM() {
    this.$backdrop = document.createElement('div');
    this.$backdrop.className = 'tour-backdrop';
    this.$backdrop.addEventListener('click', () => this._handleWrongClick());

    this.$hole = document.createElement('div');
    this.$hole.className = 'tour-hole';

    this.$tooltip = document.createElement('div');
    this.$tooltip.className = 'tour-tooltip';

    document.body.appendChild(this.$backdrop);
    document.body.appendChild(this.$hole);
    document.body.appendChild(this.$tooltip);
    document.body.style.overflow = 'hidden';
  }

  private _applyStep(index: number) {
    const step = this.steps[index];
    const target = document.querySelector(step.target) as HTMLElement;

    if (!target) {
      console.warn(`[TourEngine] Target não encontrado: ${step.target}`);
      this._advance();
      return;
    }

    this._attachClickHandler(target, step);
    this._positionHole(target, step);
    this._positionTooltip(target, step, index);
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.setAttribute('data-tour-target', 'true');
  }

  private _attachClickHandler(target: HTMLElement, step: TourStep) {
    this._removeClickHandler();
    this._currentTarget = target;
    this._currentHandler = (e: MouseEvent) => {
      if (step.action) step.action(target, e);
      this._advance();
    };

    target.style.position = target.style.position || 'relative';
    target.style.zIndex = '9002';
    target.addEventListener('click', this._currentHandler as any, { once: true });
  }

  private _removeClickHandler() {
    if (this._currentTarget && this._currentHandler) {
      this._currentTarget.removeEventListener('click', this._currentHandler as any);
      this._currentTarget.removeAttribute('data-tour-target');
      this._currentTarget.style.zIndex = '';
      this._currentTarget = null;
      this._currentHandler = null;
    }
  }

  private _advance() {
    this._removeClickHandler();
    if (this.current === this.steps.length - 1) {
      this._complete();
      return;
    }

    this.$hole?.classList.add('tour-hole--done');
    setTimeout(() => {
      this.$hole?.classList.remove('tour-hole--done');
      this.current++;
      this._applyStep(this.current);
    }, 400);
  }

  private _complete() {
    this.$hole?.classList.add('tour-hole--complete');
    if (this.$tooltip) {
      this.$tooltip.innerHTML = `
        <div class="tour-tooltip__inner">
          <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 24px; margin-bottom: 8px;">🎉</div>
            <div style="font-weight: 800; color: #10B981; font-size: 18px;">Perfeito!</div>
            <div style="color: #94A3B8; font-size: 13px;">Você completou o tutorial.</div>
          </div>
        </div>
      `;
    }

    setTimeout(() => {
      this._destroyDOM();
      localStorage.setItem(this.storageKey, 'true');
      this.active = false;
      this.onComplete();
    }, 1800);
  }

  skip() {
    this._removeClickHandler();
    this._destroyDOM();
    localStorage.setItem(this.storageKey, 'skipped');
    this.active = false;
    this.onSkip();
  }

  private _destroyDOM() {
    this.$backdrop?.remove();
    this.$hole?.remove();
    this.$tooltip?.remove();
    document.body.style.overflow = '';
    window.removeEventListener('resize', this._onResize);
  }

  private _positionHole(target: HTMLElement, step: TourStep) {
    if (!this.$hole) return;
    const rect = target.getBoundingClientRect();
    const pad = step.padding ?? 10;
    const radius = step.borderRadius ?? getComputedStyle(target).borderRadius;

    Object.assign(this.$hole.style, {
      top: (rect.top - pad) + 'px',
      left: (rect.left - pad) + 'px',
      width: (rect.width + pad * 2) + 'px',
      height: (rect.height + pad * 2) + 'px',
      borderRadius: radius,
    });
  }

  private _positionTooltip(target: HTMLElement, step: TourStep, index: number) {
    if (!this.$tooltip) return;
    const rect = target.getBoundingClientRect();
    const total = this.steps.length;
    const num = index + 1;
    const progress = (index / (total - 1)) * 100;

    this.$tooltip.innerHTML = `
      <div class="tour-tooltip__inner">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="tour-step-badge">${num} de ${total}</span>
          <button class="tour-skip-btn">Pular</button>
        </div>
        ${step.icon ? `<div style="font-size: 24px; margin-bottom: 8px;">${step.icon}</div>` : ''}
        <div class="tour-tooltip__title">${step.title}</div>
        <div class="tour-tooltip__desc">${step.desc}</div>
        <div class="tour-cta-pulse">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
          </svg>
          ${step.cta ?? 'Clique no elemento'}
        </div>
        <div class="tour-progress-track">
          <div class="tour-progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;

    const skipBtn = this.$tooltip.querySelector('.tour-skip-btn');
    skipBtn?.addEventListener('click', () => this.skip());

    const pos = this._calcTooltipPos(rect);
    Object.assign(this.$tooltip.style, {
      top: pos.top + 'px',
      left: pos.left + 'px',
    });
    this.$tooltip.setAttribute('data-dir', pos.dir);
  }

  private _calcTooltipPos(rect: DOMRect) {
    const TW = 280;
    const TH = 160;
    const GAP = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let dir = 'bottom';
    let top = rect.bottom + GAP;
    let left = rect.left + rect.width / 2 - TW / 2;

    if (top + TH > vh) {
      dir = 'top';
      top = rect.top - TH - GAP;
    }

    left = Math.max(12, Math.min(left, vw - TW - 12));
    top = Math.max(12, Math.min(top, vh - TH - 12));

    return { top, left, dir };
  }

  private _handleWrongClick() {
    this.$hole?.classList.add('tour-hole--wrong');
    this.$tooltip?.classList.add('tour-tooltip--shake');
    setTimeout(() => {
      this.$hole?.classList.remove('tour-hole--wrong');
      this.$tooltip?.classList.remove('tour-tooltip--shake');
    }, 500);
  }

  private _onResize() {
    if (!this.active || this.current === -1) return;
    const step = this.steps[this.current];
    const target = document.querySelector(step.target) as HTMLElement;
    if (target) {
      this._positionHole(target, step);
      this._positionTooltip(target, step, this.current);
    }
  }
}