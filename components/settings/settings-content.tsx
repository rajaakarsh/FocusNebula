"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, AlertCircle, Save } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface/50 border border-border">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="danger" className="text-destructive data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your public profile details and rank display.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 256x256px.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" defaultValue={user?.displayName || ""} className="max-w-md" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue={user?.email || ""} className="max-w-md" disabled />
                  <p className="text-xs text-muted-foreground">Email cannot be changed during beta.</p>
                </div>
                <div className="grid gap-2">
                  <Label>Current Rank</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">Starwalker</Badge>
                    <span className="text-sm text-muted-foreground">Level 42</span>
                  </div>
                </div>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>
                Customize your FocusNebula experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Deep Space Mode (Dark Theme)</Label>
                  <p className="text-sm text-muted-foreground">
                    Force dark mode across the entire application.
                  </p>
                </div>
                <Switch defaultChecked disabled />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Cinematic Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable WebGL backgrounds and heavy particle effects.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Auto-start Breaks</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically start break timers after a focus session.
                  </p>
                </div>
                <Switch />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" /> Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what alerts you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you haven't logged a session today.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Crew Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when your crew completes a major milestone.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a summary of your study analytics every Sunday.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-6">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions for your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-destructive/20 rounded-xl bg-destructive/5">
                <div>
                  <h4 className="font-medium text-foreground">Reset Progression</h4>
                  <p className="text-sm text-muted-foreground">
                    Reset all XP, ranks, and celestial journey progress back to zero.
                  </p>
                </div>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Reset Progress
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-destructive/20 rounded-xl bg-destructive/5">
                <div>
                  <h4 className="font-medium text-foreground">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated study data.
                  </p>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" /> Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
