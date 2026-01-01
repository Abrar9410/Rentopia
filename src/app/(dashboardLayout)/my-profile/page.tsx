import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMe } from "@/actions/user";
import ProfileField from "@/components/dashboard/profile/ProfileField";
import Image from "next/image";
import EditProfileFormModal from "@/components/dashboard/profile/EditProfileFormModal";
import ChangePasswordModal from "@/components/dashboard/profile/ChangePasswordModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";


export const metadata: Metadata = {
    title: "My Profile | Rentopia",
    description: "Profile page contains personal info of the current user."
};


const ProfilePage = async () => {

    const user: IUser = await getMe();

    return (
        <div className="p-4 sm:p-6">
            <Card className="max-w-3xl mx-auto shadow-md">
                {/* Header Section */}
                <CardHeader className="flex flex-col items-center">
                    <div className="w-40 h-48 border border-foreground rounded-xl overflow-hidden">
                        {
                            user.picture ? 
                                <Image
                                    src={user.picture}
                                    alt={user.name?.slice(0, 1).toUpperCase() as string}
                                    width={160}
                                    height={192}
                                    className="object-cover"
                                /> :
                                <p className="h-full flex flex-col justify-center items-center text-7xl font-bold">
                                    {user.name?.slice(0, 1).toUpperCase()} 
                                </p>
                        }
                    </div>
                    <CardTitle>{user.name}</CardTitle>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProfileField label="Email" value={user.email} />
                        <ProfileField label="Phone" value={user.phone || "N/A"} />
                        <ProfileField label="Address" value={user.address || "N/A"} />
                        <ProfileField label="Role" value={user.role} />
                        <ProfileField
                            label="Active Status"
                            value={
                                <Badge
                                    variant={user.isActive === "ACTIVE" ? "default" : "destructive"}
                                    className={`px-2 py-1 text-xs font-semibold ${user.isActive === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                                        } text-white`}
                                >
                                    {user.isActive}
                                </Badge>
                            }
                        />
                        <ProfileField
                            label="Email Status"
                            value={
                                <Badge
                                    variant={"default"}
                                    className={cn(
                                        { "bg-green-500": user.isVerified },
                                        { "bg-red-500": !user.isVerified },
                                        "px-2 py-1 text-xs font-semibold"
                                    )}
                                >
                                    {user.isVerified ? "Verified" : "Not Verified"}
                                </Badge>
                            }
                        />
                    </div>

                    <Separator />
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center max-sm:gap-4">
                        <EditProfileFormModal user={user}>
                            <Button className="max-sm:w-full">
                                Edit Profile
                            </Button>
                        </EditProfileFormModal>

                        <ChangePasswordModal>
                            <Button variant="outline" className="max-sm:w-full">
                                Change Password
                            </Button>
                        </ChangePasswordModal>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;