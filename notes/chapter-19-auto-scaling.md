# CHAPTER 19
# Auto Scaling

---

## 📖 Story First

The school year starts with 30 students in each class. That is perfect. The classrooms are comfortable, teachers can manage everyone, and there is enough space for everyone.

But then exam season arrives.

During exam prep weeks, the school sees something strange happen. In some periods, the Science classroom has 50 students crammed into it. Students are standing in the hallway trying to listen. The teacher is overwhelmed. Quality of teaching drops. Meanwhile, two classrooms down, the Art room sits empty with only 5 students inside.

The Principal realizes the problem: the school needs to be **flexible**.

She introduces a new system:

- The school keeps a **minimum** of 30 chairs per classroom at all times.
- When a class grows to 40 students, the school system automatically adds 10 more chairs to that classroom.
- When a class shrinks back to 20 students, the system automatically removes 10 chairs.
- The school never lets any classroom drop below 10 chairs or exceed 60 chairs.
- After adding chairs, the system takes a **cool-down break** for 5 minutes before checking again — to avoid panicking and adding chairs back and forth.

This is exactly how **Auto Scaling** works in AWS.

Auto Scaling automatically adjusts the number of EC2 instances running in your application based on real-time demand. When traffic is high, it launches new instances. When traffic drops, it terminates unused instances. You never pay for idle servers, and your application always has enough capacity.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Explain what Auto Scaling is and why it matters
- ✅ Understand Auto Scaling components: Launch Template, Scaling Policy, Desired/Min/Max
- ✅ Configure scaling policies and cooldown periods
- ✅ Set up health check replacements

---

## 🏫 School Analogy

```
┌─────────────────────────────────────────────────────────┐
│         SCHOOL  ←→  AUTO SCALING MAPPING               │
├──────────────────────────┬──────────────────────────────┤
│    SCHOOL CONCEPT        │      AWS CONCEPT             │
├──────────────────────────┼──────────────────────────────┤
│ Principal's flexible     │ Auto Scaling Group (ASG)     │
│ classroom policy         │                             │
│ Minimum chairs per room  │ Min Capacity                 │
│ Maximum chairs per room  │ Max Capacity                 │
│ Ideal chairs per room    │ Desired Capacity             │
│ (what we want normally)  │                             │
│ Supply closet with extra │ Launch Template              │
│ chairs (pre-configured)  │ (pre-configured EC2 setup)   │
│ Rule: "If class > 40    │ Scaling Policy (add 2        │
│ students, add 10 chairs" │ instances when CPU > 70%)    │
│ Rule: "If class < 20    │ Scaling Policy (remove 2     │
│ students, remove 5 docs"│ instances when CPU < 30%)    │
│ 5-minute cooldown after │ Cooldown Period              │
│ adjusting chairs        │ (wait before next action)    │
│ Checking if teacher is  │ Health Check (EC2 status)    │
│ present in room         │                             │
└──────────────────────────┴──────────────────────────────┘
```

---

## ☁️ The Actual Concept

**Auto Scaling** (more precisely, EC2 Auto Scaling) is an AWS service that automatically launches or terminates EC2 instances based on conditions you define. It ensures that your application always has the right number of instances to handle the current traffic load without wasting money on idle capacity.

### Three Components of Auto Scaling

```
┌─────────────────────────────────────────────────────────────┐
│              AUTO SCALING COMPONENTS                        │
├──────────────┬──────────────────────────────────────────────┤
│  COMPONENT   │  DESCRIPTION                                 │
├──────────────┼──────────────────────────────────────────────┤
│ Launch       │ Blueprint for new instances. Specifies:      │
│ Template     │ AMI, instance type, security group, key pair,│
│              │ storage, user data script.                   │
│              │ "Like a chair storage room with pre-setup    │
│              │  chairs ready to be deployed."               │
├──────────────┼──────────────────────────────────────────────┤
│ Auto Scaling │ The core group that manages your instances.  │
│ Group (ASG)  │ Parameters: Min, Max, Desired Capacity.      │
│              │ "Like the Principal's flexible classroom     │
│              │  policy with min/max/desired student count." │
├──────────────┼──────────────────────────────────────────────┤
│ Scaling      │ The rules that trigger scaling actions.      │
│ Policy       │ "Add 2 instances when average CPU > 70%"     │
│              │ "Remove 1 instance when average CPU < 30%"   │
│              │ "Like the rule: add chairs when >40 students"│
└──────────────┴──────────────────────────────────────────────┘
```

### Min, Max, Desired Capacity

These are the three most important numbers for any Auto Scaling Group:

```
┌─────────────────────────────────────────────────────────┐
│          CAPACITY SETTINGS                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Min Capacity = 2        Always at least 2 instances    │
│                           (never fully shut down)       │
│                                                         │
│  Desired Capacity = 3     Start with 3 instances        │
│                           (the ideal running count)     │
│                                                         │
│  Max Capacity = 10        Never exceed 10 instances     │
│                           (cost control)                │
│                                                         │
│  ASG always works to keep instance count at Desired     │
│  capacity. Scaling policies adjust Desired up/down      │
│  between Min and Max.                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Cooldown Periods

After a scaling activity happens, the Auto Scaling group enters a **cooldown period** (default 300 seconds / 5 minutes). During this time, the ASG does not launch or terminate additional instances. This prevents rapid, unnecessary scaling actions — for example, if a spike in traffic immediately drops back down, you do not want to launch and then immediately terminate instances.

```
┌─────────────────────────────────────────────────────────┐
│                 KEY FACTS TABLE                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ ASG = Auto Scaling Group (manages instance count)   │
│  ✅ Launch Template = preconfigured instance blueprint  │
│  ✅ Min = minimum instances running at all times        │
│  ✅ Max = maximum instances (cost cap)                  │
│  ✅ Desired = normal running count                      │
│  ✅ Scaling Policy = rules for when to scale up/down    │
│  ✅ Cooldown = pause between scaling actions (300s)     │
│  ✅ ASG replaces unhealthy instances automatically      │
│  ✅ Works with ELB for seamless traffic distribution    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Hands-On Lab — Set Up Auto Scaling

```
STEP 1: Create a Launch Template:
        EC2 Console → Launch Templates → Create launch template
        Name: My-Web-Template
        AMI: Amazon Linux 2023
        Instance type: t2.micro
        Key pair: MyKeyPair
        Security group: WebServer-SG
        User data:
        #!/bin/bash
        yum update -y
        yum install -y httpd
        echo "Server $(hostname)" > /var/www/html/index.html
        systemctl start httpd
        systemctl enable httpd
        Click "Create launch template"

STEP 2: Create an Auto Scaling Group:
        EC2 Console → Auto Scaling Groups → Create ASG
        Name: My-Web-ASG
        Launch Template: My-Web-Template

STEP 3: Configure Capacity:
        Desired capacity: 2
        Minimum capacity: 1
        Maximum capacity: 5

STEP 4: Network:
        VPC: MyFirstVPC
        Subnets: Select 2 public subnets (different AZs)

STEP 5: Load Balancer (optional but recommended):
        Attach to existing LB: My-ALB
        Target group: My-Target-Group
        Health check type: ELB
        Health check grace period: 300 seconds

STEP 6: Configure Scaling Policies:
        Select "Target tracking scaling policy"
        Metric type: Average CPU utilization
        Target value: 70%
        Instances need: 300 seconds warmup

STEP 7: Configure Instance Maintenance:
        Health check type: EC2 (or ELB if attached)
        Health check grace period: 300 seconds

STEP 8: Add Notifications (optional):
        Skip for now

STEP 9: Review and click "Create Auto Scaling Group"

STEP 10: Verify:
        Go to ASG → Activity tab
        You should see instances being launched
        Go to EC2 → Instances
        You should see 2 instances running

✅ Your Auto Scaling Group is active and monitoring CPU!
```

---

## 💡 Pro Tips

> 💡 **Tip 1:** Always attach your Auto Scaling Group to a Load Balancer. This ensures new instances automatically start receiving traffic when they become healthy. Without an ALB, you will need to manually handle traffic distribution to new instances.

> 💡 **Tip 2:** Use cooldown periods wisely. Short cooldowns can cause thrashing (scaling up and down rapidly), while long cooldowns can leave you under-provisioned during traffic spikes. Start with the default 300 seconds and adjust based on your application's traffic patterns.

> 💡 **Tip 3:** Set your Min capacity to at least 2 instances in different Availability Zones. This ensures high availability — if one AZ goes down, your application still runs on the instance in the other AZ.

---

## ❓ Quick Quiz

**Question 1:** You configure an ASG with Min=2, Max=10, Desired=4. Current CPU is 20%. Your scale-down policy triggers when CPU < 30% and removes 1 instance. What happens?

```
A) Nothing — ASG removes instances one at a time
B) ASG immediately removes 1 instance
C) ASG removes 1 instance after cooldown, then checks again
D) ASG removes all instances because CPU is below 30%
```
**Answer: C** — The scaling policy triggers, but the ASG waits for the cooldown period before taking action. After cooldown, it removes 1 instance and evaluates again.

---

**Question 2:** What is the purpose of a Launch Template in Auto Scaling?

```
A) It stores logs of all scaling activities
B) It defines the blueprint for new EC2 instances
C) It sends notifications when scaling happens
D) It monitors CPU usage of instances
```
**Answer: B** — A Launch Template contains all the configuration needed to launch a new EC2 instance: AMI, instance type, security group, key pair, and user data.

---

## 🎤 Interview Questions

**Q: What is Auto Scaling and how does it work?**

> Auto Scaling automatically adjusts the number of EC2 instances in response to demand. It uses a Launch Template as a blueprint for new instances, an Auto Scaling Group (ASG) to manage the instances, and Scaling Policies to define when to scale up or down. The ASG maintains the desired capacity between a configured minimum and maximum. When a CloudWatch alarm triggers (e.g., CPU > 70% for 5 minutes), the scaling policy adjusts the desired capacity, and the ASG launches or terminates instances accordingly. Health checks ensure unhealthy instances are automatically replaced.

**Q: What is the difference between horizontal and vertical scaling?**

> Horizontal scaling (scale out/in) means adding or removing the number of instances. This is what Auto Scaling does. Vertical scaling (scale up/down) means making existing instances larger or smaller (e.g., moving from t2.micro to t2.large). Horizontal scaling is generally preferred in cloud architectures because it provides better fault tolerance, higher availability, and theoretically unlimited scaling. Vertical scaling has a hard limit (the largest instance type AWS offers), and upgrading often requires downtime.

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│                CHAPTER 19 SUMMARY                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Auto Scaling = automatically adjusts instance count │
│  ✅ Like a school that adds/removes chairs dynamically  │
│  ✅ Launch Template = blueprint for new instances       │
│  ✅ ASG manages: Min, Max, Desired Capacity             │
│  ✅ Scaling Policy: rules that trigger scale up/down    │
│  ✅ Cooldown: 300s pause between scaling actions        │
│  ✅ ASG replaces unhealthy instances automatically      │
│  ✅ Horizontal scaling = add/remove instances           │
│  ✅ Always use >= 2 instances in different AZs for HA   │
│  ✅ Works with ELB for seamless traffic routing         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

---
