
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

// Create a wrapper function that maintains compatibility with both toast implementations
export const toast = (props: ToastProps) => {
  if (props.variant === "destructive") {
    return sonnerToast.error(props.title || "", {
      description: props.description,
      duration: props.duration,
    });
  } else if (props.variant === "success") {
    return sonnerToast.success(props.title || "", {
      description: props.description,
      duration: props.duration,
    });
  } else {
    return sonnerToast(props.title || "", {
      description: props.description,
      duration: props.duration,
    });
  }
};

// Provide a wrapper hook for consistency with other UI components
export const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    error: sonnerToast.error,
    success: sonnerToast.success,
    warning: sonnerToast.warning,
    info: sonnerToast.info,
    loading: sonnerToast.loading,
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
  };
};
