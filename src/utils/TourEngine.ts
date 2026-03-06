export interface TourStep {
  target: string | string[];
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

  private $hole: HTMLElement | null = null;
  private $tooltip: HTMLElement | null = null;
  private _currentTarget: HTMLElement | null = null;
  private _currentHandler: ((e: MouseEvent) => void) | null = null;
  private _globalInterceptor: ((e: MouseEvent) => void) | null = null;

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
    this._setupInterceptor();
    this._applyStep(0);
    window.addEventListener('resize', this._onResize);
  }

  private _buildDOM() {
    this.$hole = document.createElement('div');
    this.$hole.className = 'tour-hole';
    this.$hole.style.pointerEvents = 'none';

    this.$tooltip = document.createElement('div');
    this.$tooltip.className = 'tour-tooltip';

    document.body.appendChild(this.$hole);
    document.body.appendChild(this.$tooltip);
    document.body.style.overflow = 'hidden';
  }

  private _setupInterceptor() {
    this._globalInterceptor = (e: MouseEvent) => {
      if (!this.active || !this._currentTarget) return;

      const rect = this._currentTarget.getBoundingClientRect();
      const pad = 15;
      
      const isInside = (
        e.clientX >= rect.left - pad &&
        e.clientX <= rect.right + pad &&
        e.clientY >= rect.top - pad &&
        e.clientY <= rect.bottom + pad
      );

      if (!isInside) {
        // Se clicar no tooltip (botão pular), permite
        if (this.$tooltip?.contains(e.target as Node)) return;

        e.preventDefault();
        e.stopPropagation();
        this._handleWrongClick();
      }
    };

    window.addEventListener('click', this._globalInterceptor, true);
  }

  private _applyStep(index: number) {
    const step = this.steps[index];
    let target: HTMLElement | null = null;

    const selectors = Array.isArray(step.target) ? step.target : [step.target];
    for (const selector of selectors) {
      const el = document.querySelector(selector) as HTMLElement;
      if (el && el.offsetParent !== null) {
        target = el;
        break;
      }
    }

    if (!target) {
      if (index < this.steps.length - 1) {
        this.current++;
        this._applyStep(this.current);
      } else {
        this._complete();
      }
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

    target.addEventListener('click', this._currentHandler as any, { once: true });
  }

  private _removeClickHandler() {
    if (this._currentTarget && this._currentHandler) {
      this._currentTarget.removeEventListener('click', this._currentHandler as any);
      this._currentTarget.removeAttribute('data-tour-target');
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
    this.$hole?.remove();
    this.$tooltip?.remove();
    if (this._globalInterceptor) {
      window.removeEventListener('click', this._globalInterceptor, true);
    }
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
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.78)',
      border: '2px solid #F59E0B',
      zIndex: '9001'
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
    skipBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.skip();
    });

    const pos = this._calcTooltipPos(rect);
    Object.assign(this.$tooltip.style, {
      top: pos.top + 'px',
      left: pos.left + 'px',
      zIndex: '9003'
    });
    this.$tooltip.setAttribute('data-dir', pos.dir);
  }

  private _calcTooltipPos(rect: DOMRect) {
    const TW = 280;
    const TH = 180;
    const GAP = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Mobile: Se o elemento estiver na metade de baixo, mostra o card em cima.
    if (vw < 640) {
      const isBottomHalf = rect.top > vh / 2;
      const top = isBottomHalf ? 40 : vh - TH - 40;
      return { top, left: (vw - TW) / 2, dir: isBottomHalf ? 'bottom' : 'top' };
    }

    // Desktop: Lógica padrão de proximidade
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
    let target: HTMLElement | null = null;
    const selectors = Array.isArray(step.target) ? step.target : [step.target];
    for (const selector of selectors) {
      const el = document.querySelector(selector) as HTMLElement;
      if (el && el.offsetParent !== null) {
        target = el;
        break;
      }
    }
    if (target) {
      this._positionHole(target, step);
      this._positionTooltip(target, step, this.current);
    }
  }
}