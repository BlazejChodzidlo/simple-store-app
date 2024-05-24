import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Mail, Users, Wallet, Truck } from 'lucide-react';
import { getStats } from '@/lib/connections/getStats';
import OverviewAnimatedCard from '@/components/ui/overview-animated-card';
import { getRecentOrders } from '@/lib/connections/getRecentOrders';
import RecentSales from '@/components/ui/recent-sales';
import OverviewChart from '@/components/ui/overview-chart';
import { getMonthlyOrders } from '@/lib/connections/getMontklyOrders';

async function Overview() {
  const count = await getStats()
  const recentSales = await getRecentOrders()
  const monthlySales = await getMonthlyOrders()  

  return (
    <div className='w-full flex flex-col'>
      <span>Overview - here you can check the latest information and data. Please check other categories to see details.</span>
      <Separator className="my-3"/>
      <div className='flex flex-col gap-3'>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewAnimatedCard title={'Total income'} value={`${new Intl.NumberFormat('us-US', {currency: 'USD', style: 'currency'}).format(count.income)}`} delay={0.1}>
            <Wallet size={20} />
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'Completed orders'} value={count.orders} delay={0.2}>
            <Truck size={20}/>
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'Number of users'} value={count.users} delay={0.3}>
            <Users size={20}/>
          </OverviewAnimatedCard>
          <OverviewAnimatedCard title={'New messages'} value={count.support} delay={0.4}>
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

export default Overview