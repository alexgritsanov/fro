
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockCustomers } from '@/data/mockData';

interface Customer {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  officePhone: string;
  address: string;
  address2: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  needs_quote: boolean;
  customerId: string;
  contactName: string;
  favorite?: boolean;
  last_active?: string;
}

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
  layout?: 'grid' | 'list';
}

const CustomerList = ({ onSelectCustomer, layout = 'grid' }: CustomerListProps) => {
  const [customers] = useState<Customer[]>(mockCustomers);

  const handleSelect = (customer: Customer) => {
    onSelectCustomer(customer);
  };

  return (
    <ScrollArea className="h-[550px] w-full rounded-md border">
      <div className={layout === 'grid' ? "grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "flex flex-col p-4"}>
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={() => handleSelect(customer)}>
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={customer.avatar_url} alt={customer.name} />
                  <AvatarFallback>{customer.nickname}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {customer.address}
              </div>
              <div className="flex items-center justify-between mt-3">
                {customer.needs_quote && (
                  <Badge variant="secondary">Needs Quote</Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CustomerList;
