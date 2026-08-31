export interface PatternProps {
  color?: string;
  deg?: number;
  gap?: number;
  size?: number;
  style: "dots" | "dots-x" | "grid" | "stripes" | "diamond-grid";
}

export function getGradientPattern(props?: PatternProps) {
  const color = props?.color || "var(--naut-color-base-200)";
  const size = props?.size || 1;

  switch (props?.style) {
    case "dots": {
      const gap = props.gap || 15;
      return `radial-gradient(circle, ${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px`;
    }
    case "dots-x": {
      const gap = props.gap || 24;
      return `radial-gradient(${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px, radial-gradient(${color} ${size}px, transparent ${size}px) ${gap / 2}px ${gap / 2}px / ${gap}px ${gap}px`;
    }
    case "grid": {
      const deg = props.deg || 90;
      const gap = props.gap || 24;
      return `linear-gradient(${deg}deg, ${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px repeat, linear-gradient(${color} ${size}px, transparent ${size}px) 0 0 / ${gap}px ${gap}px repeat`;
    }
    case "stripes": {
      const deg = props.deg || 130;
      const gap = props.gap || 10;
      const size = props.size || 5;
      const color = props.color || "var(--naut-color-base-100)";
      return `repeating-linear-gradient(${deg}deg, ${color} 0, ${color} ${size}px,transparent ${size}px,transparent ${gap}px)`;
    }
    case "diamond-grid": {
      const deg = props.deg || 45;
      const gap = props.gap || 50;
      const size = props.size || 1;
      const color = props.color || "var(--naut-color-base-100)";
      return `repeating-linear-gradient(${deg}deg, ${color} 0px, ${color} ${size}px, transparent ${size}px, transparent ${gap}px), repeating-linear-gradient(135deg, ${color} 0px, ${color} ${size}px, transparent ${size}px, transparent ${gap}px)`;
    }
    default:
      return "none";
  }
}
