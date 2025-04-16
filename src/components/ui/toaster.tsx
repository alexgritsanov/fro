
import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      theme="light"
      className="toaster group"
      richColors
      expand
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary-gradient group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:shadow-sm group-[.toast]:hover:shadow-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-gradient-to-br !from-green-50 !to-white !border-green-200 !text-green-800 font-medium !shadow-sm",
          error: "!bg-gradient-to-br !from-red-50 !to-white !border-red-200 !text-red-800 font-medium !shadow-sm",
          warning: "!bg-gradient-to-br !from-amber-50 !to-white !border-amber-200 !text-amber-800 font-medium !shadow-sm", 
          info: "!bg-gradient-to-br !from-blue-50 !to-white !border-blue-200 !text-blue-800 font-medium !shadow-sm",
          loading: "!bg-gradient-to-br !from-gray-50 !to-white !border-gray-200 !text-gray-800 font-medium !shadow-sm",
        },
        duration: 5000,
      }}
      {...props}
    />
  );
};

export { Toaster };
