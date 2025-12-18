import { useState } from "react";
import { useStudentList } from "../service/query/useStudentList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Search, 
  Users, 
  UserCheck, 
  Building,
  // TrendingUp,
  Award,
  // Filter,
  GraduationCap,
  Star,
  BarChart3,
  Mail,
  Eye,
  UserCircle2,
  Sparkles
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const {
    data: studentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudentList();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="mb-8">
            <Skeleton className="h-12 w-96 mb-3" />
            <Skeleton className="h-6 w-[500px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-sm">
            <CardContent className="p-8">
              <Skeleton className="h-96 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full shadow-lg">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Xatolik yuz berdi</AlertTitle>
              <AlertDescription className="mt-2">
                {error?.message || "Talabalar ma'lumotlarini yuklashda xatolik"}
                <Button 
                  onClick={() => refetch()} 
                  variant="outline"
                  className="mt-4 w-full"
                >
                  Qayta yuklash
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  const students = studentsData?.data || [];

  const groupIds = Array.from(
    new Set(students.map((student) => student.groupId))
  );

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup =
      groupFilter === "all" || student.groupId === groupFilter;

    return matchesSearch && matchesGroup;
  });

  const activeStudents = students.filter(
    (s) => s.isActive && !s.isDeleted
  ).length;
  const totalStudents = students.length;

  const groupStudents: Record<string, (typeof students)[number][]> = {};
  students.forEach((student) => {
    if (!groupStudents[student.groupId]) {
      groupStudents[student.groupId] = [];
    }
    groupStudents[student.groupId].push(student);
  });

  const averageGrade = (() => {
    const grades = students
      .filter((s) => s.grade != null)
      .map((s) => Number(s.grade));
    return grades.length > 0
      ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1)
      : "0";
  })();

  const gradedStudents = students.filter((s) => s.grade).length;
  const ungradedStudents = students.filter((s) => !s.grade).length;
  const activityRate = totalStudents > 0
    ? Math.round((activeStudents / totalStudents) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-12 px-4 max-w-7xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Mening Talabalarim
                </h1>
              </div>
              <p className="text-lg text-gray-600 ml-16">
                Barcha guruhlardagi talabalar ro'yxati va statistika
              </p>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Yangi talaba
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Compact Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Jami</span>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalStudents}</div>
            <p className="text-xs text-gray-500 mt-1">Talabalar soni</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Faol</span>
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{activeStudents}</div>
            <p className="text-xs text-gray-500 mt-1">{activityRate}% faollik</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Guruhlar</span>
              <Building className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{groupIds.length}</div>
            <p className="text-xs text-gray-500 mt-1">Guruhlar soni</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">O'rtacha</span>
              <Award className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{averageGrade}</div>
            <p className="text-xs text-gray-500 mt-1">Umumiy baho</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ism yoki email bo'yicha qidiring..."
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500"
                />
              </div>

              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500">
                  <Building className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Barcha guruhlar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha guruhlar</SelectItem>
                  {groupIds.map((groupId) => (
                    <SelectItem key={groupId} value={groupId}>
                      {groupId.substring(0, 8)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid/List View */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <Card 
                key={student.id} 
                className="border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl font-bold text-gray-300 w-8">
                        {index + 1}
                      </div>
                      
                      <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
                        <AvatarImage
                          src={
                            student.url
                              ? `http://localhost:3000/${student.url}`
                              : undefined
                          }
                          alt={student.name}
                        />
                        <AvatarFallback className="text-lg font-bold bg-blue-600 text-white">
                          {student.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {student.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5" />
                            {student.groupId.substring(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {student.grade !== null ? (
                        <div className="text-center px-4 py-2 rounded-lg bg-gray-50 min-w-[80px]">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className={`h-4 w-4 ${
                              student.grade === 5 ? "text-green-600 fill-green-600" :
                              student.grade === 4 ? "text-blue-600 fill-blue-600" :
                              student.grade === 3 ? "text-yellow-600 fill-yellow-600" :
                              "text-red-600 fill-red-600"
                            }`} />
                            <span className={`text-2xl font-bold ${
                              student.grade === 5 ? "text-green-600" :
                              student.grade === 4 ? "text-blue-600" :
                              student.grade === 3 ? "text-yellow-600" :
                              "text-red-600"
                            }`}>
                              {student.grade}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">Baho</span>
                        </div>
                      ) : (
                        <div className="text-center px-4 py-2 rounded-lg bg-gray-50 min-w-[80px]">
                          <div className="text-2xl font-bold text-gray-300">-</div>
                          <span className="text-xs text-gray-400">Baho yo'q</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        {student.isActive && !student.isDeleted ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                            Faol
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-1.5"></div>
                            Nofaol
                          </Badge>
                        )}
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <UserCircle2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Talabalar topilmadi
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? "Qidiruv bo'yicha natija topilmadi"
                    : "Hozircha talabalar ro'yxati bo'sh"}
                </p>
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                  >
                    Barchasini ko'rish
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Groups Overview */}
        {Object.keys(groupStudents).length > 0 && (
          <Card className="border-gray-200 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Guruhlar
              </CardTitle>
              <CardDescription>
                Talabalarning guruhlarga taqsimlanishi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(groupStudents).map(
                  ([groupId, groupStudentsList]) => (
                    <div 
                      key={groupId} 
                      className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          <span className="font-semibold text-gray-900">
                            {groupId.substring(0, 10)}...
                          </span>
                        </div>
                        <Badge variant="secondary" className="font-semibold">
                          {groupStudentsList.length}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {groupStudentsList.slice(0, 3).map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                  {student.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate max-w-[140px] font-medium">
                                {student.name}
                              </span>
                            </div>
                            {student.grade && (
                              <span className={`text-xs font-bold ${
                                student.grade === 5 ? "text-green-600" :
                                student.grade === 4 ? "text-blue-600" :
                                student.grade === 3 ? "text-yellow-600" :
                                "text-red-600"
                              }`}>
                                {student.grade}
                              </span>
                            )}
                          </div>
                        ))}
                        {groupStudentsList.length > 3 && (
                          <div className="pt-2 text-xs text-gray-500 text-center">
                            +{groupStudentsList.length - 3} ta yana
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Statistics */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Batafsil statistika
            </CardTitle>
            <CardDescription>
              Talabalar va baholar bo'yicha ma'lumotlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {averageGrade}
                </div>
                <div className="text-sm text-gray-600 font-medium">O'rtacha baho</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {gradedStudents}
                </div>
                <div className="text-sm text-gray-600 font-medium">Baholangan</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {ungradedStudents}
                </div>
                <div className="text-sm text-gray-600 font-medium">Baholanmagan</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {activityRate}%
                </div>
                <div className="text-sm text-gray-600 font-medium">Faollik</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};