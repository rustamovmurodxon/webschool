import { useProfile } from "../service/query/useProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Calendar, 
  Shield,
  Edit3,
  Save,
  X,
  Camera
} from "lucide-react";

export const Profile = () => {
  const {
    data: teacherData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-40 w-40 rounded-full" />
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </CardHeader>
              </Card>
            </div>
            <div className="lg:col-span-8">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <Skeleton className="h-12 w-full mb-6" />
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="pt-6">
            <Alert variant="destructive" className="border-red-200">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Xatolik yuz berdi</AlertTitle>
              <AlertDescription className="mt-2">
                {error?.message || "Profil ma'lumotlarini yuklashda xatolik"}
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

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Profil topilmadi</CardTitle>
            <CardDescription className="text-base">
              Profil ma'lumotlarini yuklashda muammo yuz berdi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()} className="w-full">
              Qayta urinish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const teacher = teacherData.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profil
          </h1>
          <p className="text-lg text-muted-foreground">
            Shaxsiy ma'lumotlaringizni ko'ring va tahrirlang
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-4">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              {/* Cover Background */}
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              {/* Avatar Section */}
              <div className="relative px-6 pb-6">
                <div className="flex flex-col items-center -mt-16">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-xl ring-4 ring-blue-100">
                      <AvatarImage
                        src={
                          teacher.url
                            ? `http://localhost:3000/${teacher.url}`
                            : undefined
                        }
                        alt={teacher.name}
                      />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {teacher.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="text-center mt-4 space-y-1">
                    <h2 className="text-2xl font-bold">{teacher.name}</h2>
                    <p className="text-muted-foreground font-medium">
                      @{teacher.username}
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium text-muted-foreground">Rol</div>
                    <div className="text-sm font-bold text-blue-700">
                      {teacher.role === "TEACHER" ? "O'qituvchi" : teacher.role}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-medium text-muted-foreground">A'zo</div>
                    <div className="text-sm font-bold text-purple-700">
                      {new Date(teacher.createdAt).toLocaleDateString("uz-UZ", { 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Info List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      ID:
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {teacher.id.substring(0, 8)}...
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Holati:
                    </span>
                    <Badge 
                      variant={teacher.isActive ? "default" : "destructive"}
                      className="shadow-sm"
                    >
                      {teacher.isActive ? "Faol" : "Nofaol"}
                    </Badge>
                  </div>
                </div>

                {/* Skills Section */}
                {teacher.specifications.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                        <span className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
                        MAXORATLAR
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {teacher.specifications.map((spec) => (
                          <Badge
                            key={spec.id}
                            variant="outline"
                            className="px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            {spec.name}
                            {spec.category && (
                              <span className="text-xs text-muted-foreground ml-1">
                                ({spec.category})
                              </span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8">
            <Card className="border-0 shadow-xl">
              <Tabs defaultValue="profile" className="w-full">
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100">
                    <TabsTrigger 
                      value="profile" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profil ma'lumotlari
                    </TabsTrigger>
                    <TabsTrigger 
                      value="edit"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Tahrirlash
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="p-6">
                  <TabsContent value="profile" className="mt-0 space-y-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <span className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
                          Shaxsiy ma'lumotlar
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                              To'liq ism
                            </Label>
                            <div className="text-lg font-semibold text-gray-900">
                              {teacher.name}
                            </div>
                          </div>

                          <div className="p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-100">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                              Username
                            </Label>
                            <div className="text-lg font-semibold text-gray-900">
                              @{teacher.username}
                            </div>
                          </div>

                          <div className="p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-100">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                              Holati
                            </Label>
                            <Badge
                              variant={teacher.isActive ? "default" : "destructive"}
                              className="shadow-sm text-sm px-4 py-1"
                            >
                              {teacher.isActive ? "✓ Faol" : "✗ Nofaol"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="edit" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
                        Profilni tahrirlash
                      </h3>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold">
                            Ism Familya
                          </Label>
                          <Input
                            id="name"
                            defaultValue={teacher.name}
                            placeholder="Ismingizni kiriting"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-semibold">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue={teacher.username}
                            placeholder="Username"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <Separator className="my-6" />
                        
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            Parolni o'zgartirish
                          </h4>
                          
                          <div className="space-y-2">
                            <Label htmlFor="current-password" className="text-sm font-semibold">
                              Joriy parol
                            </Label>
                            <Input
                              id="current-password"
                              type="password"
                              placeholder="Joriy parolingizni kiriting"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-sm font-semibold">
                              Yangi parol
                            </Label>
                            <Input
                              id="new-password"
                              type="password"
                              placeholder="Yangi parol kiriting"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-sm font-semibold">
                              Yangi parolni tasdiqlash
                            </Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="Yangi parolni qayta kiriting"
                              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                          <AlertCircle className="h-5 w-5 text-blue-600" />
                          <AlertDescription className="text-sm text-blue-800 font-medium">
                            Profilni yangilash funksiyasi tez orada qo'shiladi
                          </AlertDescription>
                        </Alert>

                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            className="h-11 px-6 border-2 hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Bekor qilish
                          </Button>
                          <Button 
                            disabled 
                            className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-not-allowed opacity-60"
                          >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Tez orada...
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};