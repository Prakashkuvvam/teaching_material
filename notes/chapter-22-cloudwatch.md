# CHAPTER 22
# CloudWatch — Monitoring

---

## 📖 Story First

It is exam week at the school.

The Principal sits in the main control room. On the wall, there is a giant screen showing real-time data about every classroom in the school.

The screen shows:
- **Room 101**: 42 students present, temperature 24°C, noise level normal
- **Room 102**: 38 students present, temperature 26°C, noise level high — something might be wrong
- **Library**: 15 students, temperature normal, lights on
- **Server Room**: CPU at 89%, cooling system failing — critical alert!

Suddenly, a red alert flashes on the screen: *"Room 102 — noise level critical. Possible disruption."*

The Principal immediately calls the Head of Discipline. A teacher is dispatched. Problem resolved in 2 minutes.

This is not magic. It is a **central monitoring system**.

If there were no monitoring system, the Principal would not know about the noise in Room 102 until a fight had already broken out. The server room would overheat and catch fire before anyone noticed. The school would be reacting to disasters instead of preventing them.

**This is exactly what CloudWatch does for your AWS infrastructure.**

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what CloudWatch is and why monitoring matters
- ✅ Understand CloudWatch Metrics and Alarms
- ✅ Create a CloudWatch alarm for EC2
- ✅ View logs in CloudWatch Logs
- ✅ Set up a basic CloudWatch Dashboard

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│           SCHOOL  ←→  CLOUDWATCH MAPPING                │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ School control room      │ CloudWatch Dashboard         │
│ CCTV cameras             │ CloudWatch Metrics           │
│ Bell schedule             │ CloudWatch Alarms            │
│ Incident report logs      │ CloudWatch Logs              │
│ Principal's notifications│ CloudWatch Alarms + SNS      │
│ Teacher attendance sheet  │ EC2 CPU Utilization Metric   │
│ Fire alarm system         │ CloudWatch Alarm (critical) │
│ CCTV recording            │ CloudWatch Logs History     │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**CloudWatch** is AWS's monitoring and observability service. It collects data about your AWS resources and applications and gives you visibility into how everything is performing.

Think of it as the central nervous system of your AWS account. Without it, you are flying blind. You do not know if your EC2 server is running at 99% CPU, if your database is running out of storage, or if your application is crashing at 2 AM.

CloudWatch collects three main types of data:

- **Metrics** — Numerical data about your resources (CPU, memory, disk I/O, network traffic)
- **Logs** — Text-based log files from applications and services
- **Alarms** — Rules that trigger actions when a metric crosses a threshold

When you launch resources in AWS, many of them automatically send metrics to CloudWatch. An EC2 instance automatically reports CPU utilization, network throughput, and disk activity. An RDS database reports connection count, read/write latency, and free storage space. You do not need to install anything for these default metrics.

```
┌─────────────────────────────────────────────────────────┐
│               CLOUDWATCH FACTS                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  • Metrics = Data about your AWS resources              │
│  • Alarms = Trigger actions when thresholds breached    │
│  • Logs = Centralized log storage for your apps         │
│  • Dashboards = Custom monitoring views                 │
│  • Default metrics: CPU, Network, Disk, Status Checks   │
│  • Custom metrics: You can publish your own metrics     │
│  • Retention: Metrics (15 months), Logs (configurable) │
│  • Free Tier: 10 custom metrics, 1 GB of logs          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 CloudWatch Metrics Deep Dive

A **metric** is a single data point tracked over time.

For an EC2 instance, CloudWatch automatically tracks:

```
┌─────────────────────────────────────────────────────────┐
│           DEFAULT EC2 METRICS IN CLOUDWATCH             │
├───────────────────────┬─────────────────────────────────┤
│      METRIC           │  WHAT IT TELLS YOU              │
├───────────────────────┼─────────────────────────────────┤
│  CPUUtilization       │  % of CPU being used            │
│  NetworkIn            │  Bytes received over network    │
│  NetworkOut           │  Bytes sent over network        │
│  DiskReadOps          │  Disk read operations           │
│  DiskWriteOps         │  Disk write operations          │
│  StatusCheckFailed    │  AWS health check of EC2        │
│  (*) MemoryUsage      │  Only if you install agent!    │
│  (*) DiskSpaceUsage   │  Only if you install agent!    │
└───────────────────────┴─────────────────────────────────┘

(*) Not available by default. You need the CloudWatch Agent.
```

---

## 🔔 CloudWatch Alarms

An **alarm** watches a single metric and triggers an action when the metric crosses a defined threshold for a specified period.

```
┌─────────────────────────────────────────────────────────┐
│              HOW A CLOUDWATCH ALARM WORKS               │
│                                                         │
│  1. You choose a metric (e.g., CPUUtilization)         │
│                                                         │
│  2. You set a threshold (e.g., > 80%)                  │
│                                                         │
│  3. You set the duration (e.g., for 2 consecutive      │
│     data points, each lasting 5 minutes)               │
│                                                         │
│  4. You choose an action (e.g., send email via SNS,    │
│     stop the EC2 instance, trigger Auto Scaling)       │
│                                                         │
│  5. When the metric crosses the threshold for the       │
│     specified period → the alarm triggers your action   │
│                                                         │
│  Alarm States:                                          │
│    ✅ OK        — Everything is normal                  │
│    ⚠️ ALARM    — Threshold breached, action triggered  │
│    📋 INSUFFICIENT_DATA — Not enough data yet          │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 CloudWatch Logs

CloudWatch Logs is where you can store, monitor, and search log files from your applications.

Your application (running on EC2) can send its log files to CloudWatch Logs. Instead of SSH-ing into the server and reading log files manually, you can view everything in one place.

```
┌─────────────────────────────────────────────────────────┐
│              CLOUDWATCH LOGS TERMS                      │
├───────────────────────┬─────────────────────────────────┤
│      TERM             │  MEANING                        │
├───────────────────────┼─────────────────────────────────┤
│  Log Group            │  A container for related logs   │
│                       │  e.g., /var/log/myapp           │
│  Log Stream           │  A sequence of log events       │
│                       │  from one source (one EC2)      │
│  Log Event            │  A single log entry             │
│                       │  (has timestamp + message)      │
│  Metric Filter        │  Extract metrics from logs      │
│                       │  e.g., count ERROR occurrences │
│  Subscription Filter  │  Stream logs to other services  │
│                       │  (Lambda, Elasticsearch, etc.)  │
└───────────────────────┴─────────────────────────────────┘
```

---

## 🖥️ CloudWatch Dashboard

A **dashboard** is a custom view that shows you the most important metrics in one place.

You can add widgets showing CPU graphs for all your EC2 instances, error counts from your application logs, database connection counts, and more. Like the Principal's giant screen in the control room — everything visible at a glance.

---

## 🧪 Hands-On Lab — Create a CloudWatch Alarm for EC2

```
STEP 1: Launch a test EC2 instance
         → Use t2.micro (Free Tier)
         → We will monitor this instance

STEP 2: Go to CloudWatch Console
         Search → "CloudWatch" in AWS Console

STEP 3: Create an Alarm
         Left menu → Alarms → All alarms → "Create alarm"

STEP 4: Select a metric
         Click "Select metric"
         Navigate: EC2 → Per-Instance Metrics
         Find: CPUUtilization for your instance
         Select it → Click "Select metric"

STEP 5: Configure the alarm
         Statistic: Average
         Period: 5 minutes
         Threshold type: Static
         Define threshold: CPUUtilization > 80%

STEP 6: Configure additional conditions
         Datapoints: 2 out of 2 datapoints
         (Breach threshold for 10 consecutive minutes)

STEP 7: Configure notification
         Create a new SNS topic
         Topic name: EC2-CPU-Alert
         Email endpoints: your-email@example.com
         Click "Create topic"

STEP 8: Name your alarm
         Alarm name: HighCPU-Alarm-MyWebServer
         Click "Next" → "Create alarm"

STEP 9: Test the alarm
         SSH into the EC2 and run:
         stress --cpu 2 --timeout 300
         (Install stress first: sudo amazon-linux-extras install stress)
         
         Watch the alarm go from OK → INSUFFICIENT → ALARM
         Check your email for the SNS notification!

✅ You have now set up automated monitoring!
```

---

## 🧪 Hands-On Lab — View CloudWatch Logs

```
STEP 1: Go to CloudWatch Console → Logs → Log groups

STEP 2: If no log groups exist, you can create one:
         Click "Create log group"
         Name: /myapp/api-logs
         Retention: 7 days (for practice)
         Click "Create"

STEP 3: Send a test log entry (using AWS CLI):
         aws logs put-log-events \
           --log-group-name /myapp/api-logs \
           --log-stream-name test-stream-1 \
           --log-events timestamp=$(date +%s%3N),message="Test log entry"

STEP 4: View logs in console:
         Click on log group → Click on log stream
         You will see your test entry

✅ You can now centralize logs in CloudWatch!
```

---

## 📈 CloudWatch vs Other Tools

```
┌─────────────────────────────────────────────────────────────┐
│            MONITORING TOOLS COMPARISON                      │
├─────────────────┬───────────────────────────────────────────┤
│    TOOL         │  BEST FOR                                 │
├─────────────────┼───────────────────────────────────────────┤
│ CloudWatch      │ Native AWS monitoring + alarms            │
│ CloudTrail      │ Auditing API calls (who did what)         │
│ AWS Config      │ Tracking resource configuration changes   │
│ Trusted Advisor │ Cost optimization & security checks       │
│ VPC Flow Logs   │ Network traffic logs (IP-level)          │
└─────────────────┴───────────────────────────────────────────┘
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Install the CloudWatch Agent on EC2 to get memory and disk metrics. Default EC2 metrics do not include memory usage — you need the agent for that. School analogy: the basic CCTV only shows movement; install the agent to get audio too.

> 💡 **Tip 2:** Always set a billing alarm first. Before anything else, set a CloudWatch billing alarm for $5 (or your budget). Go to CloudWatch → Alarms → Billing → Create alarm. This has saved countless beginners from surprise AWS bills.

> 💡 **Tip 3:** Use CloudWatch Logs Insights for searching logs. Instead of scrolling through pages, write SQL-like queries: `fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc`. This is the most powerful way to debug production issues.

> 💡 **Tip 4:** Set alarms on ASG (Auto Scaling Group) metrics too. Monitor not just individual instances but group-level metrics like CPU average across all instances, and trigger scaling actions based on them.

---

## ❓ Quick Quiz

**Question 1:** What is the primary purpose of Amazon CloudWatch?

```
A) To store files in the cloud
B) To monitor AWS resources and applications
C) To manage user permissions
D) To create virtual machines
```
**Answer: B** — CloudWatch is AWS's monitoring service for collecting metrics, logs, and setting alarms.

---

**Question 2:** Which of the following EC2 metrics is available by default WITHOUT installing the CloudWatch Agent?

```
A) Memory usage
B) Disk space usage
C) CPU utilization
D) Application error count
```
**Answer: C** — CPU utilization is a hypervisor-level metric available by default. Memory and disk metrics require the CloudWatch Agent.

---

**Question 3:** An EC2 instance has CPU at 90% for 3 minutes. The alarm has a threshold of 80% and requires 2 consecutive data points at 5-minute intervals. What is the alarm state?

```
A) OK
B) ALARM
C) INSUFFICIENT_DATA
D) Cannot be determined
```
**Answer: B** — With 2 data points at 5-minute intervals (10 minutes total), and 90% for 3 minutes means it crossed the 80% threshold for the required duration. Actually wait — 3 minutes is less than 5-minute periods. The correct answer is more nuanced. Let me reconsider: if we have 2 datapoints at 5-min intervals, that spans 10 minutes. If CPU is at 90% for only 3 minutes, it depends on when the 5-min windows fall. The most likely answer is INSUFFICIENT_DATA since we need 2 datapoints. Let me simplify: **Answer: C** — We need more data points to determine.

Actually, let me redo this more carefully:

**Answer: C** — With 5-minute periods and 2 datapoints required, the alarm needs data spanning 10 minutes. Three minutes of high CPU is insufficient data to make a determination.

---

**Question 4:** You want to search through gigabytes of application logs for all ERROR messages from the last 24 hours. Which CloudWatch feature should you use?

```
A) CloudWatch Dashboard
B) CloudWatch Logs Insights
C) CloudWatch Alarms
D) CloudWatch Metrics
```
**Answer: B** — CloudWatch Logs Insights allows you to run SQL-like queries on your log data to filter, aggregate, and analyze logs efficiently.

---

## 🎤 Interview Questions

**Q: What is Amazon CloudWatch and what are its main features?**

> CloudWatch is AWS's monitoring service. Its main features are: Metrics — numerical data from AWS resources (CPU, network, etc.); Alarms — trigger actions when metrics cross thresholds; Logs — centralized log storage and querying; and Dashboards — custom views of metrics and alarms. CloudWatch gives you visibility into the health and performance of your entire AWS infrastructure.

**Q: What is the difference between CloudWatch and CloudTrail?**

> CloudWatch is for **monitoring performance** — it tracks metrics like CPU, memory, and logs application events. CloudTrail is for **auditing API activity** — it records every API call made in your account, including who made the call, from which IP, and what response they got. Think of CloudWatch as the real-time dashboard showing how things are running, and CloudTrail as the security guard's log book showing who entered and exited.

**Q: How do you monitor memory usage on EC2 instances using CloudWatch?**

> By default, CloudWatch does not track memory usage on EC2 because it is instance-level data, not hypervisor-level. To monitor memory, you install the **CloudWatch Agent** on the EC2 instance. The agent collects memory, disk, and custom metrics and sends them to CloudWatch. You configure this using a JSON configuration file that specifies which metrics to collect and how often.

**Q: How do you set up a billing alarm in AWS?**

> You first enable billing alerts in the Billing Console under Preferences. Then you go to CloudWatch → Alarms → Billing → Create alarm. You select a metric like "EstimatedCharges" and set a threshold (e.g., $5). You configure an SNS notification to send an email when the threshold is crossed. This is the very first thing every AWS user should set up after creating their account.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                   CHAPTER 22 SUMMARY                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ CloudWatch = AWS monitoring service                 │
│  ✅ Like the school control room — sees everything      │
│  ✅ Metrics = Data about resources (CPU, Network, etc.) │
│  ✅ Alarms = Trigger actions when thresholds crossed    │
│  ✅ Logs = Centralized storage for application logs     │
│  ✅ Dashboards = Custom monitoring views                │
│  ✅ Default EC2 metrics do NOT include memory/disk      │
│  ✅ Install CloudWatch Agent for full visibility        │
│  ✅ Use Logs Insights for powerful log queries          │
│  ✅ Set billing alarm FIRST — always                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---

---

