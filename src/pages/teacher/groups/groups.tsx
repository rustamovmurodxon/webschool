import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { TeacherTable } from "../../admin/components/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Users, Clock, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeacherGroups } from "../service/query/useGroupList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface GroupRow {
  count: number;
  id: string;
  name: string;
  lessonTime: string;
  durationInMonths: number;
  studentsCount: number | string;
  isActive: "Faol" | "Faol emas";
  startTime?: string;
  endTime?: string;
}

export const Groups = () => {
  const { data, isLoading, isFetching, error } = useTeacherGroups();
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Xato yuz berdi: {(error as Error).message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const groups: GroupRow[] = React.useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data.map((item: any, index: number) => ({
      id: item.id,
      count: index + 1,
      name: item.name,
      lessonTime: item.lessonTime || `${item.startTime} - ${item.endTime}`,
      durationInMonths: item.durationInMonths,
      studentsCount: item.studentsCount ?? "-",
      isActive: item.isActive ? "Faol" : "Faol emas",
      startTime: item.startTime,
      endTime: item.endTime,
    }));
  }, [data]);

  const columns: ColumnDef<GroupRow>[] = [
    { accessorKey: "count", header: "№", size: 60 },
    {
      accessorKey: "name",
      header: "Guruh nomi",
      cell: ({ row }) => (
        <div className="font-semibold text-foreground">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "lessonTime",
      header: "Dars vaqti",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          {row.original.lessonTime}
        </div>
      ),
    },
    {
      accessorKey: "durationInMonths",
      header: "Davomiyligi",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.durationInMonths} oy</Badge>
      ),
    },
    {
      accessorKey: "studentsCount",
      header: "Talabalar",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-medium">
          <Users className="h-4 w-4 text-muted-foreground" />
          {row.original.studentsCount}
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Holati",
      cell: ({ row }) => (
        <Badge
          variant={row.original.isActive === "Faol" ? "default" : "destructive"}
        >
          {row.original.isActive}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Amallar",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate(`/app/teacher/group/${row.original.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Batafsil ko‘rish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-xl">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Guruhlar</h1>
          <p className="text-muted-foreground">
            Sizga biriktirilgan barcha guruhlar ro‘yxati
          </p>
        </div>
        <Button onClick={() => navigate("/app/admin/groups")}>Yangi guruh</Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Jami guruhlar</CardTitle>
            <Layers className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{groups.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Guruhlar jadvali</CardTitle>
          <CardDescription>{groups.length} ta guruh mavjud</CardDescription>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Hozircha guruhlar mavjud emas</AlertDescription>
            </Alert>
          ) : (
            <>
              <TeacherTable columns={columns} data={groups} />
              {isFetching && (
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  Yangilanmoqda...
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}