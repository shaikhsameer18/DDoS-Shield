"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Line,
  Bar,
  Pie,
  Area,
} from "recharts";
import { MapPin, AlertTriangle, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const generateRandomData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `T${i + 1}`,
    traffic: Math.floor(Math.random() * 1000),
    attacks: Math.floor(Math.random() * 100),
    category: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  }));
};

const generateRandomGeoData = () => {
  const regions = [
    "North America",
    "Europe",
    "Asia",
    "South America",
    "Africa",
    "Australia",
  ];
  return regions.map((region) => ({
    name: region,
    value: Math.floor(Math.random() * 1000),
    blocked: Math.floor(Math.random() * 100),
  }));
};

const generateRandomServerData = () => {
  return Array.from({ length: 3 }, (_, i) => ({
    name: `Server ${i + 1}`,
    load: Math.floor(Math.random() * 100),
  }));
};

const generateRandomWAFData = () => {
  const requestTypes = ["GET", "POST", "PUT", "DELETE"];
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    type: requestTypes[Math.floor(Math.random() * requestTypes.length)],
    origin: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
    status: Math.random() > 0.5 ? "Allowed" : "Blocked",
  }));
};

const DashboardCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-blue-100">
        {title}
      </CardTitle>
      <CardDescription className="text-blue-200">{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function Dashboard() {
  const [data, setData] = useState(generateRandomData(20));
  const [geoData, setGeoData] = useState(generateRandomGeoData());
  const [serverData, setServerData] = useState(generateRandomServerData());
  const [wafData, setWafData] = useState(generateRandomWAFData());
  const [alertMessage, setAlertMessage] = useState<{
    id: number;
    message: string;
  } | null>(null);
  const [ipBlockingThreshold, setIpBlockingThreshold] = useState(50);
  const [rateLimiting, setRateLimiting] = useState(100);
  const [trafficScrubbing, setTrafficScrubbing] = useState(false);
  const [reportStartDate, setReportStartDate] = useState("");
  const [reportEndDate, setReportEndDate] = useState("");
  const [reportType, setReportType] = useState("ddos");

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData(20));
      setGeoData(generateRandomGeoData());
      setServerData(generateRandomServerData());
      setWafData(generateRandomWAFData());
      if (Math.random() > 0.7 && !alertMessage) {
        setAlertMessage({
          id: Date.now(),
          message: "New potential threat detected!",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [alertMessage]);

  const handleOptimizeLoadDistribution = () => {
    setServerData(generateRandomServerData());
  };

  const handleApplyCustomRules = () => {
    window.alert(
      `Custom rules applied: IP Blocking Threshold: ${ipBlockingThreshold}, Rate Limiting: ${rateLimiting} req/min`
    );
  };

  const handleInitiateManualScrubbing = () => {
    setTrafficScrubbing(true);
    setTimeout(() => setTrafficScrubbing(false), 3000);
  };

  const handleGenerateReport = () => {
    window.alert(
      `Generating ${reportType} report for ${reportStartDate} to ${reportEndDate}`
    );
  };

  const removeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 mt-10 text-center text-white">
          DDoS Protection Dashboard
        </h1>

        {/* Live Alert */}
        <AnimatePresence>
          {alertMessage && (
            <motion.div
              key={alertMessage.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-4"
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>{alertMessage.message}</AlertDescription>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 p-0 h-auto"
                  onClick={removeAlert}
                  aria-label="Close alert"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-blue-800 rounded-lg p-1">
            {[
              "Overview",
              "Anomaly",
              "Geo",
              "LoadBalancing",
              "WAF",
              "Scrubbing",
              "Reports",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DashboardCard
                title="Real-Time Traffic"
                description="Live traffic data visualization"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="traffic"
                      name="Traffic"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="attacks"
                      name="Attacks"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </DashboardCard>
              <DashboardCard
                title="Cloud Integration"
                description="Current cloud service performance"
              >
                <div className="flex items-center justify-between mb-4">
                  <span>Cloud Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                    Optimal
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="traffic" name="Traffic" fill="#8884d8" />
                    <Bar dataKey="attacks" name="Attacks" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="anomaly">
            <DashboardCard
              title="ML-Based Anomaly Detection"
              description="Flagged irregular activities"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="attacks"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Risk Levels</h3>
                  {["Low", "Medium", "High"].map((level, index) => (
                    <div key={level} className="mb-2 flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-2 ${
                          index === 0
                            ? "bg-green-500"
                            : index === 1
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span>{level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                View Detailed Logs
              </Button>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="geo">
            <DashboardCard
              title="Geo-Blocking Controls"
              description="Interactive world map for region blocking"
            >
              <div className="aspect-video bg-blue-700 rounded-lg flex items-center justify-center mb-4">
                {/* Adding the image here */}
                <img
                  src="https://ft.syncfusion.com/featuretour/essential-js2/images/maps/javascript-maps-library-geojson-layer.png"
                  alt="Interactive World Map"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Top Blocked Regions
                  </h3>
                  <ul>
                    {geoData.slice(0, 3).map((region) => (
                      <li
                        key={region.name}
                        className="flex items-center justify-between mb-2"
                      >
                        <span className="flex items-center">
                          <MapPin className="mr-2" size={16} />
                          {region.name}
                        </span>
                        <span>{region.blocked} blocked</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Block New Region
                  </h3>
                  <Select>
                    <SelectTrigger className="w-full bg-blue-700 text-white">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {geoData.map((region) => (
                        <SelectItem key={region.name} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Block Region
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
          <TabsContent value="loadbalancing">
            <DashboardCard
              title="Load Balancing Visualization"
              description="Server load distribution"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serverData}
                      dataKey="load"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {serverData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Server Status</h3>
                  {serverData.map((server) => (
                    <div key={server.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{server.name}</span>
                        <span>{server.load}% Load</span>
                      </div>
                      <div className="w-full bg-blue-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-400 h-2.5 rounded-full"
                          style={{ width: `${server.load}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleOptimizeLoadDistribution}
              >
                Optimize Load Distribution
              </Button>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="waf">
            <DashboardCard
              title="Web Application Firewall (WAF)"
              description="HTTP request monitoring and custom rule setup"
            >
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-blue-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Request Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Origin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-700">
                    {wafData.map((request) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.origin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "Allowed"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Custom Rule Setup
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ip-blocking" className="text-blue-100">
                      IP Blocking Threshold
                    </Label>
                    <Slider
                      id="ip-blocking"
                      max={100}
                      step={1}
                      value={[ipBlockingThreshold]}
                      onValueChange={(value) =>
                        setIpBlockingThreshold(value[0])
                      }
                      className="mt-2"
                    />
                    <span className="text-sm text-blue-200">
                      {ipBlockingThreshold} requests/minute
                    </span>
                  </div>
                  <div>
                    <Label htmlFor="rate-limiting" className="text-blue-100">
                      Rate Limiting
                    </Label>
                    <Slider
                      id="rate-limiting"
                      max={1000}
                      step={10}
                      value={[rateLimiting]}
                      onValueChange={(value) => setRateLimiting(value[0])}
                      className="mt-2"
                    />
                    <span className="text-sm text-blue-200">
                      {rateLimiting} requests/minute
                    </span>
                  </div>
                </div>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleApplyCustomRules}
                >
                  Apply Custom Rules
                </Button>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="scrubbing">
            <DashboardCard
              title="Traffic Scrubbing Dashboard"
              description="Suspicious traffic overview and manual control"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Traffic Health Score
                  </h3>
                  <div className="flex items-center">
                    <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center text-4xl font-bold">
                      85
                    </div>
                    <span className="ml-4 text-2xl">Excellent</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="traffic"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Manual Scrubbing Control
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span>Activate Traffic Scrubbing</span>
                  <Switch
                    checked={trafficScrubbing}
                    onCheckedChange={setTrafficScrubbing}
                  />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleInitiateManualScrubbing}
                >
                  {trafficScrubbing
                    ? "Scrubbing in Progress..."
                    : "Initiate Manual Scrubbing"}
                </Button>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="reports">
            <DashboardCard
              title="Historical Data & Reports"
              description="View past attacks and generate custom reports"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="traffic"
                      name="Traffic"
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="attacks"
                      name="Attacks"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Generate Custom Report
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="start-date" className="text-blue-100">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={reportStartDate}
                        onChange={(e) => setReportStartDate(e.target.value)}
                        className="mt-1 bg-blue-700 text-white border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date" className="text-blue-100">
                        End Date
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={reportEndDate}
                        onChange={(e) => setReportEndDate(e.target.value)}
                        className="mt-1 bg-blue-700 text-white border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="report-type" className="text-blue-100">
                        Report Type
                      </Label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger
                          id="report-type"
                          className="mt-1 bg-blue-700 text-white border-blue-500"
                        >
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ddos">DDoS Attacks</SelectItem>
                          <SelectItem value="waf">WAF Logs</SelectItem>
                          <SelectItem value="traffic">
                            Traffic Patterns
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleGenerateReport}
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
