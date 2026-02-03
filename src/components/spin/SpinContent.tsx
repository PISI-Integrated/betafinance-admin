"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetchSpinHistoryService, useFetchSpinRewardsService } from "@/services/spin.service";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import SpinRewardList from "./SpinRewardList";
import SpinHistoryList from "./SpinHistoryList";
import { SpinRewardForm } from "./SpinRewardForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";



const SpinContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { createQueryParams } = useCreateQueryString();

    // URL State
    const activeTab = (searchParams.get("tab") as "rewards" | "history") || "rewards";
    const page = Number(searchParams.get("page")) || 1;

    // Local state for modal
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<SpinRewardItem | null>(null);

    // Rewards Fetching
    const { spinRewards, isRewardsLoading } = useFetchSpinRewardsService({
        page: activeTab === "rewards" ? page : 1,
        size: 50,
        is_active: true
    });

    // History Fetching
    const { spinHistories, isHistoriesLoading } = useFetchSpinHistoryService({
        page: activeTab === "history" ? page : 1,
        page_size: 10,
        sort_order: 'desc',
    } as any);

    const handleTabChange = (tab: "rewards" | "history") => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        router.push(`${pathname}?${createQueryParams("page", newPage.toString())}`);
    };

    const handleEdit = (item: SpinRewardItem) => {
        setEditingReward(item);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingReward(null);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* <SpinGradients /> */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Spin Management</h1>
                <div className="flex items-center gap-2">
                    {activeTab === "rewards" && (
                        <Button onClick={handleCreate} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Reward
                        </Button>
                    )}
                </div>
            </div>

            <div className="border-b">
                <div className="flex gap-4">
                    <button
                        onClick={() => handleTabChange("rewards")}
                        className={`pb-2 text-sm font-medium transition-colors ${activeTab === "rewards"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Wheel Rewards
                    </button>
                    <button
                        onClick={() => handleTabChange("history")}
                        className={`pb-2 text-sm font-medium transition-colors ${activeTab === "history"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Win History
                    </button>
                </div>
            </div>

            <div className="min-h-[400px]">
                {activeTab === "rewards" ? (
                    <SpinRewardList
                        data={spinRewards?.rewards || []}
                        isLoading={isRewardsLoading}
                        onEdit={handleEdit}
                        currentPage={page}
                        totalItems={spinRewards?.total || 0}
                        itemsPerPage={50}
                        onPageChange={handlePageChange}
                    />
                ) : (
                    <SpinHistoryList
                        data={spinHistories?.items || []}
                        isLoading={isHistoriesLoading}
                        currentPage={page}
                        totalItems={spinHistories?.total || 0}
                        itemsPerPage={10}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <SpinRewardForm
                open={isFormOpen}
                onOpenChange={(open) => {
                    setIsFormOpen(open);
                    if (!open) setEditingReward(null);
                }}
                initialData={editingReward}
                existingRewards={spinRewards?.rewards || []}
            />
        </div>
    );
};

export default SpinContent;
