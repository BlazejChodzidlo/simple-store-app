import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Mail, Users, Wallet, Truck } from 'lucide-react';
import { getStats } from '@/lib/connections/getStats';
import OverviewAnimatedCard from '@/components/ui/overview-animated-card';
import { getRecentOrders } from '@/lib/connections/getRecentOrders';
import RecentSales from '@/components/ui/recent-sales';
import OverviewChart from '@/components/ui/overview-chart';
import { getMonthlyOrders } from '@/lib/connections/getMontklyOrders';

async function Panel() {
  const count = await getStats()
  const recentSales = await getRecentOrders()
  const monthlySales = await getMonthlyOrders()  

  return (
    <div className='w-full flex flex-col'>
      <span>Przegląd - tutaj możesz sprawdzić ostatnie informacje i dane. Aby zobaczyć szczegóły sprawdź inne kategorie.</span>
      <Separator className="my-3"/>
      <div className='flex flex-col gap-3'>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewAnimatedCard title={'Całkowity dochód'} value={`${count.income} zł`} delay={0.1}>
            <Wallet size={20} />
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'Ukończone zamównienia'} value={count.orders} delay={0.2}>
            <Truck size={20}/>
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'Ilość użytkowników'} value={count.users} delay={0.3}>
            <Users size={20}/>
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'Nowe wiadomości'} value={count.support} delay={0.4}>
            <Mail size={20}/>
          </OverviewAnimatedCard>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <RecentSales recentSales={recentSales.sales} delay={0.1} numberOfMonthlySales={count.monthOrders}/>
          <OverviewChart delay={0.3} sales={monthlySales.orders}/>
        </div>
      </div>
    </div>
  )
}

export default Panel