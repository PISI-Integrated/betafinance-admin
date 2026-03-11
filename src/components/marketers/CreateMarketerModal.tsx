import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateMarketerService } from "@/services/marketers.service";
import { Wand2 } from "lucide-react";

interface CreateMarketerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMarketerModal = ({ isOpen, onClose }: CreateMarketerModalProps) => {
  const { createMarketer, isMarketerLoading } = useCreateMarketerService();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ICreateMarketerDto>({
    defaultValues: {
      is_active: true,
      payout: 0,
    },
  });

  const marketerName = watch("name");

  const generatePrefix = () => {
    if (!marketerName) return;
    const base = marketerName
      .trim()
      .replace(/\s+/g, "")
      .slice(0, 5)
      .toLowerCase();
    const random = Math.random().toString(36).substring(2, 6);
    setValue("prefix", `${base}-${random}`);
  };

  const onSubmit = async (data: ICreateMarketerDto) => {
    data.payout = Number(data.payout);
    await createMarketer(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95%] sm:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Marketer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Marketer Name</Label>
            <Input
              id="name"
              placeholder="e.g. Range Media"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <div className="relative w-full">
              <Input
                id="prefix"
                placeholder="Unique prefix for the marketer"
                {...register("prefix", { required: "Prefix is required" })}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={generatePrefix}
                title="Generate prefix"
                disabled={!marketerName}
                className="absolute top-0 right-1 z-[10] border-none cursor-pointer bg-transparent p-0 hover:bg-transparent"
              >
                <Wand2 className="h-4 w-4 hover:text-primary disabled:cursor-not-allowed" />
              </Button>
            </div>
            {errors.prefix && (
              <p className="text-xs text-red-500">{errors.prefix.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payout">Payout</Label>
            <Input
              id="payout"
              type="number"
              placeholder="Payout amount for the marketer"
              {...register("payout", { required: "Payout is required" })}
              min={0}
            />
            {errors.payout && (
              <p className="text-xs text-red-500">{errors.payout.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postback_url">Postback URL (Optional)</Label>
            <Input
              id="postback_url"
              placeholder="https://example.com/callback"
              {...register("postback_url")}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={field.value ? "true" : "false"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isMarketerLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isMarketerLoading}>
              {isMarketerLoading ? "Creating..." : "Create Marketer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMarketerModal;
