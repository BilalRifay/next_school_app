import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { z } from "zod";


const authSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

export default function AuthTabs() {
    const [activeTab, setActiveTab] = useState("login");
    const [role, setRole] = useState("admin");
    const { registerOrLogin, resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showReset, setShowReset] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateFields = () => {
        try {
        
            authSchema.parse({ email, password });
            setErrors({}); 
            return true;
        } catch (error) {
            const errorMessages = error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            setErrors(errorMessages); 
            return false;
        }
    };

    const handleSubmit = () => {
        if (validateFields()) {
            registerOrLogin({ email, password, role });
        }
    };

    const handleClose = () => {
        navigate("/"); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <motion.div
                className="w-[400px] shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-[95%] lg:w-full m-auto py-5 md:py-4">
                    <CardHeader className="relative">
                        <CardTitle className="text-2xl font-bold text-center">
                            {activeTab === "login" ? "Login" : "Register"}
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-[85%] m-auto grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>

                        {/* Conditionally render Role Selection for Registration */}
                        {activeTab === "register" && (
                            <div className="mb-4">
                                <Tabs value={role} onValueChange={setRole} className="w-full mb-2">
                                    <TabsList className="grid grid-cols-3 w-[85%] m-auto">
                                        <TabsTrigger value="admin">Admin</TabsTrigger>
                                        <TabsTrigger value="teacher">Teacher</TabsTrigger>
                                        <TabsTrigger value="students">Student</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        )}

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <CardContent className="space-y-4 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-red-500">{errors.password}</p>}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSubmit}>
                                    Log in
                                </Button>
                            </CardFooter>
                            <div className="text-center mt-2">
                                <Button onClick={() => setShowReset(!showReset)} className="bg-transparent text-black hover:bg-transparent mt-2">
                                    Forgot password?
                                </Button>
                            </div>

                            {/* Password Reset */}
                            {showReset && (
                                <CardContent className="space-y-4 mt-4">
                                    <Label htmlFor="reset-email">Enter your email</Label>
                                    <Input
                                        id="reset-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                    <Button className="w-full" onClick={() => resetPassword(email)}>
                                        Send Reset Link
                                    </Button>
                                </CardContent>
                            )}
                        </TabsContent>

                        {/* Register Tab */}
                        <TabsContent value="register">
                            <CardContent className="space-y-4 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                />
                                {errors.password && <p className="text-red-500">{errors.password}</p>}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSubmit}>
                                    Register as {role}
                                </Button>
                            </CardFooter>
                            <div className="text-center mt-2">
                                <Button onClick={() => setActiveTab("login")} className="bg-transparent text-black hover:bg-transparent">
                                    Already have an account? Log in here
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </Card>
            </motion.div>
        </div>
    );
}
