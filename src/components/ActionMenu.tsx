
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, MoreVertical, EllipsisVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  isChecked?: boolean;
  isCheckable?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
  groups?: { 
    label?: string;
    actions: ActionItem[];
  }[];
  iconOnly?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  label?: string;
  triggerIcon?: React.ReactNode;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  actions = [],
  groups = [],
  iconOnly = false,
  triggerClassName,
  contentClassName,
  side = 'bottom',
  label,
  triggerIcon
}) => {
  // Determine if we're using simple actions or grouped actions
  const hasGroups = groups.length > 0;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={iconOnly ? "icon" : "sm"}
          className={cn("h-8 transition-all focus-visible:ring-2 focus-visible:ring-unidoc-primary-blue/30", triggerClassName)}
        >
          {triggerIcon ? triggerIcon : <EllipsisVertical className="h-4 w-4" />}
          {!iconOnly && <span className="ml-2">Actions</span>}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" side={side} className={cn("min-w-48 z-50", contentClassName)}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        
        {/* When using the simple actions array */}
        {!hasGroups && actions.map((action, index) => (
          action.isCheckable ? (
            <DropdownMenuCheckboxItem
              key={index}
              checked={action.isChecked}
              onCheckedChange={() => action.onClick()}
              className={cn(
                action.variant === 'destructive' && "text-unidoc-error",
                action.variant === 'success' && "text-unidoc-success",
                action.variant === 'warning' && "text-unidoc-warning"
              )}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuCheckboxItem>
          ) : (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={cn(
                action.variant === 'destructive' && "text-unidoc-error",
                action.variant === 'success' && "text-unidoc-success",
                action.variant === 'warning' && "text-unidoc-warning"
              )}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          )
        ))}
        
        {/* When using grouped actions */}
        {hasGroups && groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}
            
            {group.actions.map((action, actionIndex) => (
              action.isCheckable ? (
                <DropdownMenuCheckboxItem
                  key={actionIndex}
                  checked={action.isChecked}
                  onCheckedChange={() => action.onClick()}
                  className={cn(
                    action.variant === 'destructive' && "text-unidoc-error",
                    action.variant === 'success' && "text-unidoc-success",
                    action.variant === 'warning' && "text-unidoc-warning"
                  )}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuCheckboxItem>
              ) : (
                <DropdownMenuItem
                  key={actionIndex}
                  onClick={action.onClick}
                  className={cn(
                    action.variant === 'destructive' && "text-unidoc-error",
                    action.variant === 'success' && "text-unidoc-success",
                    action.variant === 'warning' && "text-unidoc-warning"
                  )}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              )
            ))}
            
            {groupIndex < groups.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
