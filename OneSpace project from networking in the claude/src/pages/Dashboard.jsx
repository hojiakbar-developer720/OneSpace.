import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import MetricCard from "../components/dashboard/MetricCard";
import TaskDistributionChart from "../components/dashboard/TaskDistributionChart";
import WorkloadBar from "../components/dashboard/WorkloadBar";
import { KanbanSquare, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, ShoppingBag, DollarSign, BarChart2, Package, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { format, isAfter, isBefore, addDays } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Dashboard() {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date"),
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const overdueTasks = tasks.filter(
    (t) => t.due_date && isBefore(new Date(t.due_date), new Date()) && t.status !== "done"
  ).length;
  const upcomingTasks = tasks
    .filter(
      (t) =>
        t.due_date &&
        isAfter(new Date(t.due_date), new Date()) &&
        isBefore(new Date(t.due_date), addDays(new Date(), 7)) &&
        t.status !== "done"
    )
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5);

  // Fake store metrics
  const storeMetrics = {
    revenue: 48320,
    orders: 312,
    conversion: 3.8,
    topProducts: [
      { name: "Obsidian Desk Lamp", sales: 89, revenue: 16821, rating: 4.9 },
      { name: "Ceramic Pour Set", sales: 74, revenue: 9916, rating: 4.7 },
      { name: "Walnut Side Table", sales: 41, revenue: 16359, rating: 4.9 },
      { name: "Velvet Cushion Set", sales: 68, revenue: 7616, rating: 4.8 },
    ],
    recentOrders: [
      { id: "#4821", customer: "Amara Chen", product: "Obsidian Desk Lamp", amount: 189, status: "shipped" },
      { id: "#4820", customer: "Lucas Ferreira", product: "Walnut Side Table", amount: 399, status: "processing" },
      { id: "#4819", customer: "Sofia Park", product: "Merino Knit Throw", amount: 245, status: "delivered" },
      { id: "#4818", customer: "James Liu", product: "Ceramic Pour Set", amount: 134, status: "delivered" },
    ],
  };

  const orderStatusStyle = {
    shipped: "bg-sky-500/15 text-sky-400",
    processing: "bg-amber-500/15 text-amber-400",
    delivered: "bg-emerald-500/15 text-emerald-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Overview of your workspace & store performance</p>
      </div>

      {/* Store Overview Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/15 p-5"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200">OneSpace Store</p>
              <p className="text-xs text-zinc-500">Live e-commerce storefront</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xl font-bold text-zinc-100">${storeMetrics.revenue.toLocaleString()}</p>
              <p className="text-xs text-zinc-500">This Month</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-zinc-100">{storeMetrics.orders}</p>
              <p className="text-xs text-zinc-500">Orders</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-emerald-400">{storeMetrics.conversion}%</p>
              <p className="text-xs text-zinc-500">Conversion</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={createPageUrl("Home")}
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 transition-colors border border-zinc-700/50"
              >
                Homepage
              </Link>
              <Link
                to={createPageUrl("Store")}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition-colors flex items-center gap-1"
              >
                Store <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Tasks" value={totalTasks} icon={KanbanSquare} accentColor="violet" />
        <MetricCard title="In Progress" value={inProgressTasks} icon={Clock} accentColor="sky" />
        <MetricCard title="Completed" value={completedTasks} icon={CheckCircle} accentColor="emerald" />
        <MetricCard title="Overdue" value={overdueTasks} icon={AlertTriangle} accentColor="rose" />
      </div>

      {/* Store detail cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Top Products</h3>
            <Link to={createPageUrl("Store")} className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              View store <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {storeMetrics.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-zinc-600 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-300 truncate">{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-zinc-500">{p.rating}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-zinc-200">${p.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-zinc-500">{p.sales} sold</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Recent Orders</h3>
            <Package className="h-4 w-4 text-zinc-600" />
          </div>
          <div className="space-y-3">
            {storeMetrics.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">{order.id}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${orderStatusStyle[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-300 mt-0.5 truncate">{order.customer}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{order.product}</p>
                </div>
                <span className="text-sm font-bold text-zinc-200 shrink-0">${order.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Task Distribution</h3>
          <TaskDistributionChart tasks={tasks} />
        </motion.div>

        {/* Team Workload */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Team Workload</h3>
            <Link to={createPageUrl("Team")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {members.length === 0 ? (
              <p className="text-xs text-zinc-600">No team members yet</p>
            ) : (
              members.slice(0, 6).map((m) => <WorkloadBar key={m.id} member={m} />)
            )}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Upcoming Deadlines</h3>
            <Link to={createPageUrl("Board")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              View board
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="text-xs text-zinc-600">No upcoming deadlines</p>
            ) : (
              upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between py-1.5">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-xs font-medium text-zinc-300 truncate">{task.title}</p>
                    <p className="text-[10px] text-zinc-600">{task.assigned_to || "Unassigned"}</p>
                  </div>
                  <span className="text-[10px] text-amber-400 font-medium shrink-0">
                    {format(new Date(task.due_date), "MMM d")}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}