/**
 * TimeOfDay.js — Reads visitor's local time and returns lighting parameters.
 * The site looks different at dawn, midday, golden hour, and midnight.
 */
export class TimeOfDay {
  constructor() {
    this.params = this.calculate();
  }

  calculate() {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const t = hour + minute / 60; // Fractional hour

    // Time brackets with smooth interpolation
    if (t >= 5 && t < 7)   return this.lerp(this.deepNight(), this.dawn(), (t - 5) / 2);
    if (t >= 7 && t < 10)  return this.lerp(this.dawn(), this.morning(), (t - 7) / 3);
    if (t >= 10 && t < 15) return this.midday();
    if (t >= 15 && t < 17) return this.lerp(this.midday(), this.afternoon(), (t - 15) / 2);
    if (t >= 17 && t < 19) return this.lerp(this.afternoon(), this.goldenHour(), (t - 17) / 2);
    if (t >= 19 && t < 21) return this.lerp(this.goldenHour(), this.dusk(), (t - 19) / 2);
    if (t >= 21 && t < 25) return this.lerp(this.dusk(), this.night(), Math.min((t - 21) / 3, 1));
    // 1am–5am
    return this.deepNight();
  }

  dawn() {
    return {
      name: 'dawn',
      lightColor: [1.0, 0.831, 0.639],   // #FFD4A3
      intensity: 0.6,
      shadowLength: 2.5,
      ambientColor: [0.15, 0.08, 0.04],
      ambientIntensity: 0.3,
      grainIntensity: 0.05,
      useCandle: false,
    };
  }

  morning() {
    return {
      name: 'morning',
      lightColor: [1.0, 0.945, 0.839],   // #FFF1D6
      intensity: 0.85,
      shadowLength: 1.8,
      ambientColor: [0.12, 0.1, 0.08],
      ambientIntensity: 0.35,
      grainIntensity: 0.04,
      useCandle: false,
    };
  }

  midday() {
    return {
      name: 'midday',
      lightColor: [1.0, 0.98, 0.94],     // #FFFAF0
      intensity: 1.0,
      shadowLength: 0.5,
      ambientColor: [0.15, 0.14, 0.12],
      ambientIntensity: 0.4,
      grainIntensity: 0.03,
      useCandle: false,
    };
  }

  afternoon() {
    return {
      name: 'afternoon',
      lightColor: [1.0, 0.894, 0.71],    // #FFE4B5
      intensity: 0.9,
      shadowLength: 1.5,
      ambientColor: [0.14, 0.1, 0.06],
      ambientIntensity: 0.35,
      grainIntensity: 0.04,
      useCandle: false,
    };
  }

  goldenHour() {
    return {
      name: 'golden_hour',
      lightColor: [0.831, 0.463, 0.039], // #D4760A
      intensity: 0.75,
      shadowLength: 2.8,
      ambientColor: [0.12, 0.06, 0.02],
      ambientIntensity: 0.25,
      grainIntensity: 0.05,
      useCandle: false,
    };
  }

  dusk() {
    return {
      name: 'dusk',
      lightColor: [0.545, 0.271, 0.075], // #8B4513
      intensity: 0.5,
      shadowLength: 3.5,
      ambientColor: [0.08, 0.04, 0.02],
      ambientIntensity: 0.2,
      grainIntensity: 0.06,
      useCandle: false,
    };
  }

  night() {
    return {
      name: 'night',
      lightColor: [0.8, 0.5, 0.15],
      intensity: 0.15,
      shadowLength: 0,
      ambientColor: [0.04, 0.02, 0.01],
      ambientIntensity: 0.1,
      grainIntensity: 0.07,
      useCandle: true,
      candleFlicker: { freq: 5, amplitude: 0.15 },
    };
  }

  deepNight() {
    return {
      name: 'deep_night',
      lightColor: [0.7, 0.35, 0.08],
      intensity: 0.08,
      shadowLength: 0,
      ambientColor: [0.02, 0.01, 0.005],
      ambientIntensity: 0.06,
      grainIntensity: 0.08,
      useCandle: true,
      candleFlicker: { freq: 3, amplitude: 0.2 },
    };
  }

  lerp(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    const result = {};
    for (const key of Object.keys(a)) {
      if (Array.isArray(a[key])) {
        result[key] = a[key].map((v, i) => v + (b[key][i] - v) * t);
      } else if (typeof a[key] === 'number') {
        result[key] = a[key] + (b[key] - a[key]) * t;
      } else if (typeof a[key] === 'object' && a[key] !== null) {
        result[key] = this.lerp(a[key], b[key] || a[key], t);
      } else {
        result[key] = t > 0.5 ? b[key] : a[key];
      }
    }
    return result;
  }
}
