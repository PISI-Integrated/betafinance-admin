"use client";
import { X, Shield, CheckCircle2, FileText, Edit } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface RoleDetailsSidebarProps {
  role: IRolesResponse | null;
  onClose: () => void;
  onEdit: (role: IRolesResponse) => void;
}

const RoleDetailsSidebar = ({
  role,
  onClose,
  onEdit,
}: RoleDetailsSidebarProps) => {
  if (!role) return null;

  return (
    <Card className="h-full overflow-hidden rounded-2xl border-none px-2 bg-white ring-1 ring-gray-200/50 animate-in slide-in-from-right duration-300">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-2 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 capitalize tracking-tight">
                  {role.name}
                </h2>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-100 py-0.5 px-1 text-xs font-bold uppercase tracking-wider"
              >
                System Role
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-4">
            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <FileText className="h-3 w-3" />
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  Description
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-2 rounded-lg border border-gray-100">
                {role.description || "No description provided for this role."}
              </p>
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="h-3 w-3" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">
                    Permissions
                  </h3>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold p-2 rounded-full text-xs">
                  {role.permissions?.length || 0}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {role.permissions && role.permissions.length > 0 ? (
                  role.permissions.map((perm: any) => (
                    <div
                      key={perm.id}
                      className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-colors group"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                          {perm.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {perm.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 px-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/50 gap-1">
                    <Shield className="h-6 w-6 text-gray-200" />
                    <p className="text-[10px] text-gray-400 font-medium italic text-center">
                      No permissions assigned
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Footer */}
        <div className="p-2 mt-auto border-t border-gray-100 bg-gray-50/30">
          <Button
            onClick={() => onEdit(role)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-xs"
          >
            <Edit className="h-3 w-3" />
            Edit Role
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleDetailsSidebar;
