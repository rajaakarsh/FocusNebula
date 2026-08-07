"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Crown, Rocket, Zap, Trophy } from "lucide-react";
import { AreaChartWidget } from "@/components/charts/study-charts";

const MOCK_CREW = [
  { id: 1, name: "Alex Kim", role: "Commander", rank: "Starwalker", status: "online", xp: 12450 },
  { id: 2, name: "Sarah J.", role: "Navigator", rank: "Cosmonaut", status: "offline", xp: 8900 },
  { id: 3, name: "Marcus T.", role: "Engineer", rank: "Explorer", status: "focusing", xp: 5200 },
];

const MOCK_CHART_DATA = [
  { date: "Mon", minutes: 120, sessions: 2, xp: 250 },
  { date: "Tue", minutes: 150, sessions: 3, xp: 300 },
  { date: "Wed", minutes: 180, sessions: 3, xp: 400 },
  { date: "Thu", minutes: 90,  sessions: 1, xp: 200 },
  { date: "Fri", minutes: 240, sessions: 4, xp: 600 },
  { date: "Sat", minutes: 60,  sessions: 1, xp: 100 },
  { date: "Sun", minutes: 0,   sessions: 0, xp: 0 },
];

export function CrewDashboard() {
  const totalXP = MOCK_CREW.reduce((sum, member) => sum + member.xp, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Crew Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your study crew and track collective progress.
          </p>
        </div>
        <Button className="gap-2">
          <Users className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Collective Focus</CardTitle>
            <CardDescription>Combined crew study time this week</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartWidget data={MOCK_CHART_DATA} height={300} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" /> Crew Level 12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total XP</span>
                  <span className="font-bold">{totalXP.toLocaleString()}</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground">3,500 XP to Level 13</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Active Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-500">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Mars Expedition</h4>
                    <p className="text-xs text-muted-foreground">30 Hours Collective Focus</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crew Roster</CardTitle>
          <CardDescription>Current members of your study group.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {MOCK_CREW.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "focusing"
                          ? "bg-primary animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      {member.role === "Commander" && (
                        <Crown className="h-3.5 w-3.5 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {member.rank} • {member.xp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
                <Badge variant={member.status === "focusing" ? "default" : "outline"} className={member.status === "focusing" ? "bg-primary/20 text-primary hover:bg-primary/30 border-0" : ""}>
                  {member.status === "focusing" ? (
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" /> In Session
                    </span>
                  ) : (
                    member.status
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
