# Kubernetes Learning Guide: The BMTC Story

## A Complete Beginner's Journey Through Kubernetes Using Bengaluru's Bus System

---

# BEFORE WE BEGIN: How to Use This Guide

This guide teaches Kubernetes through one consistent story: **Bengaluru's BMTC bus system**.

Every concept you learn will feel like a natural extension of the same world. By the end, you will not just memorize Kubernetes terms. You will **understand** why each piece exists and what problem it solves.

**Who this is for:** Complete beginners. Zero Kubernetes experience needed.

**What you need:** Curiosity and patience. Technical jargon will always be explained before it is used.

**How to read this:** Episode by episode, in order. Each episode builds on the previous one.

---

# THE STORY SO FAR: Setting the Scene

Bengaluru is growing fast.

Millions of people need to travel every day. The government decides to build the most modern, intelligent bus system in India. They call it the **New BMTC System**.

This system needs to:
- Run hundreds of buses across the city
- Never stop even if something breaks down
- Add more buses when crowds grow
- Remove buses when demand drops
- Keep everything organized and trackable

The engineers who built this system made the same decisions that Kubernetes engineers made. That is not a coincidence. Both are solving the same fundamental problem: **how do you manage a large number of things reliably, automatically, and at scale?**

---

# EPISODE 1: The Big Picture

## What Is the Whole System?

### Kubernetes Concept: Cluster

When you run Kubernetes, you are not working with one computer. You are working with a **group of computers working together as one unified system**.

This group is called a **Cluster**.

> **BMTC Analogy:** The entire BMTC transportation system across Bengaluru. Not one bus. Not one depot. The whole thing — every depot, every bus, every route, every office — working together as one transportation network.

```
BMTC System = Kubernetes Cluster
"The entire transportation network of Bengaluru"
```

---

## Who Is In Charge?

Every large system needs a brain. Someone or something that:
- Knows the overall plan
- Makes decisions
- Monitors whether things are working
- Fixes problems when they occur

### Kubernetes Concept: Control Plane

The **Control Plane** is the brain of Kubernetes. It does not run your applications. It manages everything else that does.

> **BMTC Analogy:** The **Majestic BMTC Central Control Office**. The big building where senior officers sit. They do not drive buses. They decide how many buses run, which routes need more buses, and what to do when a bus breaks down.

---

## Where Do Buses Actually Run?

The control office makes decisions, but buses actually run from **depots**. Depots are where buses are parked, maintained, and dispatched.

### Kubernetes Concept: Worker Node

A **Worker Node** is a computer (or server) where your actual applications run. The Control Plane tells Worker Nodes what to do. Worker Nodes do the actual work.

> **BMTC Analogy:** A **BMTC Depot**. Each depot in Bengaluru — Shivajinagar Depot, Yeshwanthpur Depot, Bannerghatta Depot — is a Worker Node. The Control Office (Control Plane) instructs each depot what to do.

```
Majestic Central Office  =  Control Plane (the brain)
Shivajinagar Depot       =  Worker Node 1
Yeshwanthpur Depot       =  Worker Node 2
Bannerghatta Depot       =  Worker Node 3
```

---

## What Actually Runs on a Worker Node?

### Kubernetes Concept: Pod

A **Pod** is the smallest thing Kubernetes manages. When you want to run an application, Kubernetes wraps it inside a Pod and places that Pod on a Worker Node.

Think of a Pod as a **wrapper** or a **capsule** around your application.

> **BMTC Analogy:** A **BMTC Bus**. The bus is the unit of transportation. It goes to a depot. It runs on routes. It is tracked and managed. When you need more capacity, you add more buses. When a bus breaks, you replace it.

---

## What Is Inside a Pod?

### Kubernetes Concept: Container

A **Container** is the actual application running inside a Pod. A Pod usually has one main Container. Sometimes it has two (one doing the main work, one doing a supporting task).

> **BMTC Analogy:** The **Driver** inside the bus. The driver is the one actually doing the work — driving the bus. Without the driver, the bus is just a parked vehicle. The bus (Pod) exists to house and transport the driver (Container) so the driver can do the job.

```
Bus (Pod) → contains → Driver (Container)
```

> **Slightly advanced note:** Sometimes a bus has both a **driver and a conductor**. The conductor collects tickets while the driver drives. In Kubernetes, this is called a **sidecar container** — a second container inside the Pod doing a supporting job like logging or security.

---

## Where Do Buses Come From?

### Kubernetes Concept: Image

Before a bus hits the road, someone had to **design and build it**. There is a blueprint — exact specifications for engine type, seat count, door positions, fuel type. Every bus built from that blueprint is identical.

In Kubernetes, your application needs to be packaged before it can run. This package is called an **Image**. It contains everything your application needs: the code, the settings, the libraries.

> **BMTC Analogy:** The **bus manufacturing blueprint**. Tata Motors or Volvo creates a design. BMTC orders buses built from that design. Every bus built from the same blueprint is identical and behaves the same way.

### Kubernetes Concept: Registry

Where are these blueprints stored? In a **Registry**. When Kubernetes needs to create a new Pod (bus), it fetches the Image (blueprint) from the Registry.

> **BMTC Analogy:** The **bus factory and warehouse**. All standard bus models are stored here. When a depot needs a new bus, they request one from the factory.

```
Bus Blueprint     =  Image
Bus Factory       =  Registry (e.g., Docker Hub)
New Bus Built     =  Container created from the Image
```

---

## Episode 1 Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                        │
│              (Entire BMTC Transportation System)             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CONTROL PLANE                           │  │
│  │         (Majestic Central Control Office)            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │  WORKER NODE 1 │  │  WORKER NODE 2 │  │ WORKER NODE 3│  │
│  │ (Shivajinagar  │  │ (Yeshwanthpur  │  │ (Bannerghatta│  │
│  │    Depot)      │  │    Depot)      │  │   Depot)     │  │
│  │                │  │                │  │              │  │
│  │  [Pod=Bus]     │  │  [Pod=Bus]     │  │  [Pod=Bus]   │  │
│  │  [Pod=Bus]     │  │  [Pod=Bus]     │  │              │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**What you learned:**

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Cluster | Entire BMTC System | Group of computers working as one |
| Control Plane | Central Control Office | Brain of Kubernetes |
| Worker Node | BMTC Depot | Computer where apps run |
| Pod | BMTC Bus | Wrapper around your application |
| Container | Bus Driver | The actual application |
| Image | Bus Blueprint | Packaged application |
| Registry | Bus Factory/Warehouse | Where Images are stored |

---

# EPISODE 2: Management and Reliability

## The Problem This Episode Solves

Imagine BMTC says: **"Route 500D must always have exactly 5 buses running."**

Now, what happens when one bus breaks down? Someone needs to notice and send a replacement. What if two buses break down simultaneously? What if there is a festival and you need 10 buses instead of 5?

This episode explains how Kubernetes handles all of this automatically.

---

## Part 1: The Operations Plan

### Kubernetes Concept: Deployment

A **Deployment** is a document you give to Kubernetes that says: *"I want this application to always run with this many copies."*

That is it. You declare your desire. Kubernetes figures out how to make it happen.

> **BMTC Analogy:** The **Daily Operations Plan** issued by the Central Control Office. This document says things like: *"Route 500D must always have 5 buses running. Use the Volvo AC model."* The plan is the authority. Everything else exists to fulfill the plan.

---

## Part 2: The Officer Counting Buses

### Kubernetes Concept: ReplicaSet

When you create a Deployment, Kubernetes automatically creates a **ReplicaSet** underneath it.

A ReplicaSet has one job: **count the running Pods and make sure the count matches what was requested**.

If you asked for 5 Pods and only 4 are running, the ReplicaSet creates one more. If 6 are running somehow, it removes one.

> **BMTC Analogy:** A **Supervising Officer** stationed at the route checkpoint. This officer counts buses on Route 500D every few minutes. If the count drops below 5, they immediately radio the depot to dispatch another. They do not care why a bus is missing. They just care about the number.

```
Deployment     =  The Operations Plan ("Always run 5 buses on 500D")
ReplicaSet     =  The Supervising Officer (counts and corrects)
Replica        =  Each individual bus dispatched from the plan
```

---

## Part 3: Who Decides Which Depot Gets the Bus?

### Kubernetes Concept: Scheduler

When the ReplicaSet says *"we need one more Pod"*, someone has to decide **which Worker Node (Depot) the new Pod goes to**.

That job belongs to the **Scheduler**.

The Scheduler looks at all available Worker Nodes, checks how busy each one is, and places the new Pod on the most suitable one.

> **BMTC Analogy:** The **Operations Manager** at the Central Office. When a new bus needs to be dispatched, the Operations Manager checks: Which depot has available bays? Which depot has fuel? Which depot is closest to the route? Then they say: *"Send the bus from Yeshwanthpur Depot."*

---

## Part 4: Who Watches Everything?

### Kubernetes Concept: Controller Manager

The **Controller Manager** is a senior officer that runs a set of control loops. A control loop is a simple process that runs forever:

1. Check the current situation
2. Compare it to the desired situation
3. Take action to fix any difference
4. Repeat

> **BMTC Analogy:** A **Senior Operations Officer** who walks through the entire system all day, every day. They check every route, every depot, every bus. If something is wrong — a bus broke down, a depot is overloaded, a route has no buses — they trigger the right action. They never stop checking.

```
CONTROL LOOP EXAMPLE:

Desired State:  5 buses on Route 500D
Current State:  4 buses on Route 500D (one broke down)
Action:         Create 1 new Pod (dispatch 1 replacement bus)
Result:         5 buses on Route 500D ✓
```

---

## Part 5: Self-Healing — The Most Impressive Feature

This is where beginners usually have their first *"wow"* moment.

When a Pod crashes or a Worker Node fails, **Kubernetes automatically replaces it**. You do not need to wake up at 3 AM to manually restart your application.

> **BMTC Analogy:** Bus number KA-57-F-1234 breaks down on Route 500D. The Supervising Officer notices the count dropped from 5 to 4. They radio the depot. Within minutes, a replacement bus is dispatched. The passenger at the bus stop never even knew one bus was missing. The system healed itself.

This is called **Self-Healing**, and it is one of Kubernetes' most important features.

---

## Part 6: Scaling — Growing and Shrinking

### Kubernetes Concept: Scaling

**Scaling** means changing the number of running Pods based on demand.

- **Scale up:** Run more Pods when demand increases
- **Scale down:** Run fewer Pods when demand decreases

> **BMTC Analogy:**
> - **Rajyotsava Day:** Massive crowds everywhere. The Control Office scales up Route 500D from 5 buses to 15 buses.
> - **Sunday 2 AM:** Almost no passengers. The Control Office scales down from 5 buses to 2 buses to save fuel and maintenance cost.

Scaling can be done:
- **Manually:** You tell Kubernetes the new number
- **Automatically:** Kubernetes detects load and scales by itself (we cover this in Episode 7)

---

## Episode 2 Summary

```
YOU WRITE A DEPLOYMENT
        │
        ▼
┌───────────────────┐
│    Deployment     │  "Always run 5 Pods of this app"
│  (Operations Plan)│
└────────┬──────────┘
         │ creates and manages
         ▼
┌───────────────────┐
│    ReplicaSet     │  Counts Pods, creates or deletes to match desired number
│ (Supervising      │
│   Officer)        │
└────────┬──────────┘
         │ needs new Pod? asks
         ▼
┌───────────────────┐
│    Scheduler      │  Picks the best Worker Node
│ (Operations       │
│   Manager)        │
└────────┬──────────┘
         │ places Pod on
         ▼
┌───────────────────┐
│   Worker Node     │  Pod runs here
│    (Depot)        │
└───────────────────┘
```

**What you learned:**

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Deployment | Daily Operations Plan | Desired state declaration |
| ReplicaSet | Supervising Officer | Ensures correct Pod count |
| Replica | Each dispatched bus | One copy of your application |
| Scheduler | Operations Manager | Decides which Node gets the Pod |
| Controller Manager | Senior Operations Officer | Runs control loops to fix differences |
| Self-Healing | Auto-replacement of broken bus | Kubernetes auto-replaces crashed Pods |
| Scaling | Add/remove buses by demand | Add/remove Pods by demand |

---

# EPISODE 3: How Passengers Reach the Buses

## The Problem This Episode Solves

Buses are running. Great. But passengers need a way to board them.

You cannot tell passengers: *"Go find bus KA-57-F-1234 parked somewhere in the city."* That makes no sense. Passengers need a **fixed, stable location** to go to. A bus stop.

Kubernetes has the same problem. Your applications (Pods) change all the time. They crash and get replaced with new names. They scale up and down. You cannot tell other applications or users: *"Go find Pod xyz-ab123 somewhere in the cluster."*

You need something stable. That is what this episode explains.

---

## Part 1: The Bus Stop

### Kubernetes Concept: Service

A **Service** is a stable, fixed endpoint that routes traffic to one of the available Pods behind it.

The Service has a permanent address. It never changes. Even if all the Pods behind it are replaced, the Service address stays the same.

> **BMTC Analogy:** A **Bus Stop**.
>
> Think about Silk Board Bus Stop. You go there and wait. You do not know:
> - Which specific bus will come
> - Which depot it came from
> - Which driver is driving
> - What the bus number is
>
> You just stand at Silk Board Bus Stop, and the next available Route 500D bus arrives and picks you up.
>
> That is exactly what a Kubernetes Service does.

```
Silk Board Bus Stop  =  Kubernetes Service
Route 500D buses     =  Pods behind the Service
Passenger            =  User or other application making a request
```

---

## Part 2: Which Buses Are Currently at the Stop?

### Kubernetes Concept: Endpoints

Behind every Service, Kubernetes maintains a list of the actual Pods currently available to receive traffic. This list is called **Endpoints**.

The list is **dynamic** — it updates automatically when Pods are added, removed, or crash.

> **BMTC Analogy:** The **list of buses currently serving Silk Board Bus Stop** at this moment. Right now it might be buses KA-01-F-1111, KA-01-F-2222, and KA-01-F-3333. Ten minutes later, one might have moved on and a new one arrived. The list keeps changing, but the bus stop itself stays in the same place.

---

## Part 3: Entering the City — Main Gateway

### Kubernetes Concept: Ingress

A **Service** handles traffic to one specific application. But what if users from **outside** the cluster need to reach your applications?

Kubernetes has a component called **Ingress** that acts as a smart main entrance. It receives all incoming traffic and routes it to the right Service based on rules you define.

For example:
- Traffic to `maps.bmtc.com` → goes to the Maps Service
- Traffic to `tickets.bmtc.com` → goes to the Ticket Booking Service
- Traffic to `tracking.bmtc.com` → goes to the Bus Tracking Service

> **BMTC Analogy:** **Majestic Bus Terminal main entrance**.
>
> You arrive at Majestic from outside the city. You walk through the main entrance. Signs and staff direct you: *"Airport buses at Platform 18. Mysuru buses at Platform 12. Whitefield buses at Platform 5."*
>
> You entered through one gate. You were routed to the right destination.

### Kubernetes Concept: Ingress Controller

The Ingress just defines the **rules**. Something needs to actually **implement** those rules.

> **BMTC Analogy:** The **traffic officer standing at the Majestic entrance** who actually reads the signs and physically directs passengers to the correct platform.

```
Ingress          =  The sign/rule board at Majestic entrance
Ingress Controller =  The officer implementing those rules
Service          =  Each platform (Platform 5, 12, 18)
Pod              =  The specific bus at that platform
```

---

## Part 4: How Does Everyone Find Each Other?

### Kubernetes Concept: DNS

When one application needs to talk to another inside a Kubernetes cluster, it uses a **name** not an IP address. Kubernetes has a built-in DNS system that converts these names to the correct addresses automatically.

> **BMTC Analogy:** The **city route directory and maps**. When a bus driver needs to reach Yeshwanthpur Depot, they look up the address in the directory. They use the name, not raw coordinates. The directory handles the translation.

---

## Episode 3 Visual

```
OUTSIDE WORLD
      │
      │  "I want to reach tickets.bmtc.com"
      ▼
┌─────────────────────────────────────────────────────┐
│                    INGRESS                          │
│             (Majestic Main Entrance)                │
│                                                     │
│  tickets.bmtc.com  → Ticket Service                 │
│  tracking.bmtc.com → Tracking Service               │
│  maps.bmtc.com     → Maps Service                   │
└──────────────┬──────────────────────────────────────┘
               │
               ▼
      ┌─────────────────┐
      │  Ticket Service  │   ← Stable address never changes
      │   (Bus Stop)     │
      └────────┬─────────┘
               │  routes to one of these
               ▼
    ┌──────────────────────┐
    │  Endpoints List:     │
    │  Pod-abc (Bus 1)     │
    │  Pod-def (Bus 2)     │
    │  Pod-xyz (Bus 3)     │
    └──────────────────────┘
```

**What you learned:**

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Service | Bus Stop | Stable entry point to a set of Pods |
| Endpoints | List of buses at the stop right now | Current list of Pods behind a Service |
| Ingress | Majestic Main Entrance | Routes external traffic to Services |
| Ingress Controller | Traffic officer at entrance | Implements Ingress rules |
| DNS | City route directory | Name-to-address translation inside cluster |

---

# EPISODE 4: Configuration and Storage

## The Problem This Episode Solves

Buses need more than just a driver. They need:
- A route board showing passengers where they are going
- Fuel cards and keys to operate
- Luggage compartments for passenger bags
- Garages where luggage can be stored permanently

Your application needs the same things:
- Configuration (which database to connect to, what port to use)
- Secrets (passwords, API keys)
- Storage (where to save files that must survive a restart)

---

## Part 1: The Route Board

### Kubernetes Concept: ConfigMap

A **ConfigMap** stores non-sensitive configuration that your application needs. Things like:
- Which database host to connect to
- What port to listen on
- What timezone to use
- Feature flags

You store this in a ConfigMap, not hardcoded inside your application. This way, you can change the configuration without rebuilding the application.

> **BMTC Analogy:** The **route board and timetable inside the bus**. It tells the driver which route they are on today, which stops to make, what time they should reach each stop. The driver (application) reads this board (ConfigMap) to know how to behave today. Change the route board, change the behavior — without changing the driver.

---

## Part 2: The Keys and Fuel Card

### Kubernetes Concept: Secret

A **Secret** stores **sensitive** information. Passwords, database credentials, API keys, certificates.

Secrets look similar to ConfigMaps but Kubernetes treats them with extra care. They are encoded and restricted so not everyone can read them.

> **BMTC Analogy:** The **driver's keys, fuel card, and ticket machine credentials**. These are not posted on the route board for everyone to see. They are given privately to the driver. Only authorized people know these details.

```
ConfigMap  =  Route board (visible, non-sensitive)
Secret     =  Driver's keys and fuel card (private, sensitive)
```

> **Important difference:**
> - ConfigMap: "Connect to database at `db.bmtc.internal`" → not sensitive
> - Secret: "Database password is `Sup3rS3cur3!`" → very sensitive

---

## Part 3: The Luggage Compartment

### Kubernetes Concept: Volume

By default, if a Pod (bus) is replaced, everything that was stored inside it **disappears**. The new Pod starts completely fresh.

Sometimes that is fine. But sometimes your application needs to **save data that survives** even if the Pod is replaced.

A **Volume** is storage attached to a Pod that can hold data.

> **BMTC Analogy:** The **luggage compartment underneath the bus**. Passengers store their bags there during the journey. The compartment is part of this bus.

---

## Part 4: The Permanent Garage

### Kubernetes Concept: Persistent Volume (PV)

A **Persistent Volume** is storage that exists **independently of any Pod**. Even if the Pod is deleted and recreated, the data in the Persistent Volume survives.

> **BMTC Analogy:** A **BMTC garage or storage facility**. The garage exists independently of any specific bus. Buses come and go. Buses get retired. But the garage stays. Luggage stored in the garage is there regardless of which bus comes next.

### Kubernetes Concept: Persistent Volume Claim (PVC)

A **Persistent Volume Claim** is how a Pod **requests access** to a Persistent Volume. The Pod says: *"I need 10GB of storage."* Kubernetes finds an appropriate Persistent Volume and connects them.

> **BMTC Analogy:** A **depot formally requesting access to storage space**. The depot submits a request: *"We need a covered garage with space for 10 buses."* The central office finds and assigns an appropriate facility.

### Kubernetes Concept: StorageClass

A **StorageClass** defines the **type** of storage that can be provisioned. Fast SSD? Slow HDD? Network-attached? Premium?

> **BMTC Analogy:** The **type of garage requested**. Covered with security = premium. Open parking = standard. Climate-controlled = special. Different options, different costs.

```
Persistent Volume (PV)       =  The actual garage facility
Persistent Volume Claim (PVC) =  Depot's request for garage space
StorageClass                 =  Type of garage (covered, open, premium)
```

---

## Episode 4 Visual

```
┌─────────────────────────────────────────────────────┐
│                      POD (Bus)                      │
│                                                     │
│  ┌────────────────┐    ┌────────────────────────┐   │
│  │   ConfigMap    │    │        Secret          │   │
│  │  (Route Board) │    │  (Keys & Fuel Card)    │   │
│  │                │    │                        │   │
│  │ route=500D     │    │ db_password=*****      │   │
│  │ stops=42       │    │ api_key=*****          │   │
│  └────────────────┘    └────────────────────────┘   │
│                                                     │
│  ┌────────────────────────────────────────────┐     │
│  │              Volume                        │     │
│  │         (Luggage Compartment)              │     │
│  └────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                          │
              data that must survive?
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│           Persistent Volume (PV)                    │
│              (BMTC Garage)                          │
│    Lives independently of any Pod                   │
│    Data survives Pod deletion                       │
└─────────────────────────────────────────────────────┘
         ▲
         │ connected by
┌────────────────┐
│      PVC       │  Pod requests storage
│ (Depot Request)│  "I need 10GB covered storage"
└────────────────┘
```

**What you learned:**

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| ConfigMap | Route board and timetable | Non-sensitive configuration data |
| Secret | Driver keys and fuel card | Sensitive data like passwords |
| Volume | Luggage compartment in bus | Storage attached to a Pod |
| Persistent Volume | BMTC garage | Storage independent of any Pod |
| PVC | Depot's request for garage | Pod's request for persistent storage |
| StorageClass | Type of garage | Type of storage to provision |

---

# EPISODE 5: Organization and Labeling

## The Problem This Episode Solves

BMTC runs many types of services:
- City buses
- Airport buses  
- Electric buses
- Volvo AC buses
- School special buses

Without organization, it becomes chaos. You cannot manage hundreds of buses without a system to group, label, and find them.

Kubernetes faces the same challenge at scale. This episode covers how Kubernetes organizes everything.

---

## Part 1: Dividing Into Departments

### Kubernetes Concept: Namespace

A **Namespace** is a way to divide one Kubernetes cluster into multiple virtual sections. Each section is isolated. Resources in one Namespace do not interfere with another.

Think of it as different divisions within the same company. Same parent organization, but separate operations.

> **BMTC Analogy:** Different **BMTC service divisions**:
> - Airport Division (handles all airport routes)
> - Electric Bus Division (handles all electric routes)
> - City Division (handles regular city routes)
> - School Special Division (handles school buses)
>
> They all belong to BMTC. But they operate separately, have separate budgets, separate staff, and separate rules.

```
Kubernetes Cluster     =  BMTC Organization
Namespace: production  =  City Division
Namespace: staging     =  Training Division
Namespace: monitoring  =  Operations Division
```

---

## Part 2: Stickers on Buses

### Kubernetes Concept: Labels

**Labels** are key-value pairs attached to any Kubernetes resource. They help identify and organize resources.

A Pod might have labels like:
- `app: ticket-service`
- `type: electric`
- `route: 500D`
- `tier: premium`

> **BMTC Analogy:** **Stickers on buses**.
>
> Look at a BMTC bus. It has stickers showing:
> - Electric (green sticker)
> - AC (blue sticker)
> - Volvo (logo)
> - Express (red stripe)
> - Route number board
>
> These stickers help everyone instantly identify what kind of bus it is and what rules apply to it.

---

## Part 3: Selecting the Right Buses

### Kubernetes Concept: Selectors

A **Selector** is a query that says: *"Find all resources that have these labels."*

Services use Selectors to find which Pods they should route traffic to. Deployments use Selectors to know which Pods they manage.

> **BMTC Analogy:** A **rule to pick specific buses**:
> - *"Send only Electric buses to this charging station route"*
> - *"Pick all Volvo AC buses for the airport service"*
> - *"Find all Route 500D buses for the peak-hour audit"*
>
> You are not naming specific buses. You are saying: *"Any bus with these labels."*

```
Label    =  Sticker on the bus
Selector =  Rule like "find all buses with the Electric sticker"
```

---

## Part 4: Staff Notes That Passengers Don't See

### Kubernetes Concept: Annotations

**Annotations** are also key-value pairs, like Labels. But they are **not used for selection or identification**. They store extra information that tools or humans might need.

Things like:
- When this was last deployed
- Who owns this resource
- Link to the documentation
- Configuration used by monitoring tools

> **BMTC Analogy:** **Staff notes attached to the bus file** (not on the bus itself). The passenger never sees these. But the depot manager's records show: *"This bus was serviced on 15-Nov. Next service due 15-Feb. Inspector: Ravi. Workshop: Majestic Workshop 3."* Useful information for staff, not for passengers.

---

## Episode 5 Summary Diagram

```
BMTC ORGANIZATION (Cluster)
│
├── City Division (Namespace: city)
│   ├── Bus [app=route-service, type=diesel, route=500D]
│   ├── Bus [app=route-service, type=diesel, route=500D]
│   └── Bus [app=route-service, type=diesel, route=201R]
│
├── Airport Division (Namespace: airport)
│   ├── Bus [app=airport-express, type=volvo-ac]
│   └── Bus [app=airport-express, type=volvo-ac]
│
└── Electric Division (Namespace: electric)
    ├── Bus [app=electric-route, type=electric, route=E1]
    └── Bus [app=electric-route, type=electric, route=E2]

SELECTOR EXAMPLE:
"Give me all buses where type=electric"
→ Returns all buses in Electric Division
```

**What you learned:**

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Namespace | BMTC service division | Virtual partition of cluster |
| Label | Sticker on bus | Key-value tag for identification |
| Selector | Rule to find buses by sticker | Query to find resources by label |
| Annotation | Staff notes in bus file | Extra metadata for tools and humans |

---

# EPISODE 6: Special Types of Operations

## The Problem This Episode Solves

Not all buses operate the same way.

Some routes are standard — the same bus model, running the same route, interchangeable with any other bus on that route.

But some operations are special:
- The Airport Express has reserved, numbered buses
- The road-sweeping trucks must cover every area of the city
- The census bus visits once a year
- Night maintenance runs happen on a fixed schedule

Kubernetes has different workload types to handle these different scenarios.

---

## Part 1: Reserved Identity Buses

### Kubernetes Concept: StatefulSet

A regular Deployment creates Pods that are **interchangeable**. Pod A and Pod B are identical. If Pod A dies, Pod B can do its job. Order does not matter.

But some applications need **stable identity**. They have a fixed name, fixed storage, and they come up in a fixed order. Databases are a good example. You cannot just swap Database-0 with Database-2 without consequences.

A **StatefulSet** manages Pods that need stable, persistent identity.

> **BMTC Analogy:** **Reserved, numbered airport express buses**.
>
> Airport Bus #1, Airport Bus #2, Airport Bus #3.
>
> These are not interchangeable. Bus #1 always loads at Terminal 1. Bus #2 at Terminal 2. Bus #3 at Terminal 3. Each bus has its own designated boarding area (storage). If Bus #1 breaks down, you fix Bus #1 specifically — you do not just swap it with Bus #3 and hope passengers figure it out.

```
Deployment  =  Standard city buses (interchangeable)
StatefulSet =  Reserved airport buses with fixed identities
```

---

## Part 2: One Guard at Every Depot

### Kubernetes Concept: DaemonSet

A **DaemonSet** ensures that **exactly one copy** of a Pod runs on **every Worker Node** in the cluster. Whenever a new Node joins, the DaemonSet automatically places a Pod on it.

This is typically used for cluster-wide tasks like:
- Log collection (collect logs from every machine)
- Security scanning (run on every machine)
- Monitoring agents (report metrics from every machine)

> **BMTC Analogy:** The rule that says **every BMTC depot must have exactly one security guard and one cleaning crew**.
>
> It does not matter how many depots there are. When a new depot opens, a security guard is immediately assigned. When a depot closes, the guard is removed. One guard per depot, always, automatically.

```
New depot opens  →  DaemonSet automatically places one Pod there
Depot closes     →  DaemonSet automatically removes the Pod
```

---

## Part 3: The Festival Shuttle

### Kubernetes Concept: Job

A **Job** creates one or more Pods to perform a **specific task**, and when the task is complete, the Pods are done. They do not restart. They are not meant to run forever.

Use cases:
- Sending a batch of emails
- Processing a file
- Running a database migration
- Generating a report

> **BMTC Analogy:** A **one-time special shuttle service**.
>
> Bengaluru Marathon Day: BMTC deploys special shuttle buses to transport runners from the finish line to parking areas. The task starts at 7 AM, finishes by 1 PM, and the buses return to their depots. The job is done. These buses are not permanently assigned to this route.

---

## Part 4: The 5 AM Daily Airport Shuttle

### Kubernetes Concept: CronJob

A **CronJob** is like a Job, but it runs on a **schedule**. You define when it should run using a time expression, and Kubernetes kicks it off automatically at that time.

> **BMTC Analogy:** The **scheduled daily 5 AM airport shuttle**.
>
> Every single morning at 5:00 AM, regardless of who is working or who remembers, the airport special shuttle departs. It is on the schedule. It runs automatically. No one needs to manually start it each day.

```
Job      =  One-time festival shuttle (runs once, then done)
CronJob  =  Daily 5 AM airport shuttle (runs on schedule, repeats)
```

---

## Episode 6 Comparison Table

| Workload Type | When to Use | BMTC Analogy |
|--------------|------------|--------------|
| Deployment | Standard apps that run continuously | Regular city bus routes |
| StatefulSet | Apps that need fixed identity and ordered startup | Reserved numbered airport buses |
| DaemonSet | Something that must run on every Node | One security guard per depot |
| Job | One-time task with a definite end | Marathon day festival shuttle |
| CronJob | Recurring scheduled task | Daily 5 AM airport special |

---

# EPISODE 7: Keeping Buses Healthy and Smart Scaling

## The Problem This Episode Solves

Running buses is not enough. You need to know:
- Is this bus still working?
- Is this bus ready to take passengers yet?
- Is demand increasing? Should we add more buses?
- Can we update buses without service interruption?

---

## Part 1: Health Checks — Three Types

Kubernetes has three ways to check if a Pod is healthy. All three map beautifully to bus analogies.

---

### Kubernetes Concept: Liveness Probe

*"Is this bus engine still running?"*

A **Liveness Probe** checks whether a Pod is **alive**. If it fails, Kubernetes kills the Pod and creates a new one.

Imagine a bus engine that seized up. The bus is technically present, but it is not functioning. It will never function again on its own. The right action is to remove it and bring a replacement.

> **BMTC Analogy:** A **remote engine check**. The Control Office pings the bus: *"Is your engine running?"* If there is no response three times in a row, they declare the bus broken and dispatch a replacement.

---

### Kubernetes Concept: Readiness Probe

*"Is this bus ready to take passengers?"*

A **Readiness Probe** checks whether a Pod is **ready to receive traffic**. Even if the Pod is alive, it might not be ready yet — it might still be loading data, warming up, or connecting to a database.

If a Readiness Probe fails, Kubernetes removes that Pod from the Service's Endpoints list. No traffic is sent to it until it passes.

> **BMTC Analogy:** A **pre-departure check**. The bus has arrived at the stop. Engine is running. But the doors are not yet open. Passengers cannot board yet. The bus stop display still shows *"Next bus in 3 minutes"* because this bus is not ready yet. Once the doors open, it is added to the available list.

---

### Kubernetes Concept: Startup Probe

*"Has this bus finished warming up?"*

A **Startup Probe** is specifically for applications that take a long time to start. During startup, you do not want Liveness Probes to kill the Pod just because it has not responded yet.

> **BMTC Analogy:** **Cold morning engine warm-up**. On a cold winter morning, a bus engine needs 5 minutes to warm up before it can be checked normally. You do not apply the normal checks during warm-up. You wait for warm-up to finish, then begin regular health checks.

```
Startup Probe   =  "Has the warm-up finished?" (one-time, at startup)
Liveness Probe  =  "Is the engine still running?" (ongoing, kills if failed)
Readiness Probe =  "Are the doors open for passengers?" (ongoing, removes from traffic if failed)
```

---

## Part 2: Updating Without Disruption

### Kubernetes Concept: Rolling Update

When you deploy a new version of your application, you do not want to shut everything down and restart. That would cause downtime.

A **Rolling Update** replaces Pods **one at a time**. New version Pod comes up. Old version Pod goes down. Repeat. Service continues throughout.

> **BMTC Analogy:** Replacing the bus fleet with new Volvo models **one bus at a time**.
>
> Replace Bus 1 with new Volvo → Route still has 4 buses running.
> Replace Bus 2 with new Volvo → Route still has 4 buses running.
> Continue until all 5 are replaced.
>
> Passengers barely notice. Service was never interrupted.

### Kubernetes Concept: Rollback

If the new version has problems, **Rollback** brings back the previous version immediately.

> **BMTC Analogy:** The new Volvo buses have a defect — their doors get stuck. The Control Office immediately rolls back: bring the old buses back into service while the problem is fixed.

---

## Part 3: Automatic Scaling

### Kubernetes Concept: Horizontal Pod Autoscaler (HPA)

The **HPA** watches CPU or memory usage. When it goes high, it automatically adds more Pods. When it drops, it removes Pods.

*Horizontal* means adding more copies of the same thing (more buses, same size).

> **BMTC Analogy:** **Automatic crowd detection**.
>
> Sensors at Silk Board Bus Stop detect a growing queue. Signal reaches the Control Office automatically. System dispatches 3 additional buses. Queue clears. Demand drops. Extra buses return to depot.

### Kubernetes Concept: Vertical Pod Autoscaler (VPA)

Instead of adding more Pods, the **VPA** makes existing Pods **bigger** — giving them more CPU or memory.

*Vertical* means making the existing thing bigger (same number of buses, bigger buses).

> **BMTC Analogy:** **Upgrading from mini-bus to full-size bus**.
>
> Instead of sending 2 extra small buses, you swap the mini-bus currently running with a 60-seater. Same number of buses, more capacity.

```
Horizontal Scaling (HPA)  =  Add more buses (same size)
Vertical Scaling (VPA)    =  Replace with bigger buses
```

---

## Episode 7 Summary

```
HEALTH CHECKS:
─────────────
Startup Probe   → Bus warming up? Wait for it.
Liveness Probe  → Engine running? If not, replace bus.
Readiness Probe → Doors open? If not, don't send passengers.

UPDATES:
────────
Rolling Update  → Replace buses one at a time. No downtime.
Rollback        → New buses defective? Bring back old ones immediately.

SCALING:
────────
HPA → Queue growing? Add more buses automatically.
VPA → Need more capacity? Upgrade to bigger bus.
```

---

# EPISODE 8: Security and Access Control

## The Problem This Episode Solves

Not everyone in BMTC has the same authority.

- A **Commissioner** can approve new routes and budgets
- A **Depot Manager** can manage their depot but not others
- A **Driver** can operate their assigned bus
- A **Conductor** can manage tickets but cannot drive

If every employee had access to everything, it would be chaotic and unsafe. The same is true in Kubernetes.

---

## Part 1: Who Can Do What

### Kubernetes Concept: RBAC (Role-Based Access Control)

**RBAC** is the system for controlling who can do what in Kubernetes.

You define:
- **Roles:** What actions are allowed (read Pods, create Deployments, delete Services)
- **RoleBindings:** Which users or services get which role

> **BMTC Analogy:** **Job titles and authority levels**.
>
> | Role | What They Can Do |
> |------|----------------|
> | Commissioner | Approve routes, change budgets, access everything |
> | Depot Manager | Manage their own depot only |
> | Driver | Operate their assigned bus |
> | Conductor | Manage tickets on their bus |
>
> A conductor cannot suddenly drive the bus. A depot manager cannot approve a new route. Authority is defined by role.

---

## Part 2: Official Employee ID for Applications

### Kubernetes Concept: Service Account

When a Pod needs to interact with the Kubernetes API — for example, to query what other Pods are running — it needs an identity.

A **Service Account** is an identity given to a Pod so it can interact with Kubernetes systems with defined permissions.

> **BMTC Analogy:** An **official employee ID card** issued to each bus.
>
> When Bus KA-57-F-1234 needs to access the BMTC fuel system or log into the maintenance portal, it uses its official ID card. The system knows who is making the request and what they are allowed to do.

---

## Part 3: Road Rules for Network Traffic

### Kubernetes Concept: Network Policy

By default, all Pods in a Kubernetes cluster can communicate with all other Pods. This is convenient but not always safe.

A **Network Policy** defines which Pods can talk to which other Pods.

> **BMTC Analogy:** **Traffic rules controlling which buses can enter certain lanes or depots**.
>
> *"Only airport buses are allowed in Terminal entry lanes."*
> *"Fuel tankers cannot enter passenger zones."*
> *"City buses cannot enter the airport restricted area."*
>
> These rules control traffic flow based on the type of vehicle, not individual vehicles.

---

## Part 4: The Security Checkpoint

### Kubernetes Concept: Admission Controller

When a request comes to create or modify a resource in Kubernetes, **Admission Controllers** intercept the request and can:
- Validate it (is this request allowed?)
- Modify it (add default values)
- Reject it (this violates policy)

> **BMTC Analogy:** The **security checkpoint before a bus enters service**.
>
> Before any new bus is allowed on the road, it goes through:
> - Document verification (insurance, fitness certificate)
> - Safety inspection (brakes, lights, emergency exits)
> - Compliance check (meets pollution norms)
>
> If it fails any check, it does not get cleared. The Admission Controller is this checkpoint.

---

## Episode 8 Summary

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| RBAC | Job titles defining authority | Permission system for Kubernetes access |
| Service Account | Bus's official employee ID | Identity for Pods to interact with Kubernetes |
| Network Policy | Traffic lane rules | Rules controlling Pod-to-Pod communication |
| Admission Controller | Pre-service safety checkpoint | Validates/modifies/rejects API requests |

---

# EPISODE 9: Inside the Control Office

## The Problem This Episode Solves

We have used the "Central Control Office" analogy since Episode 1. Now it is time to open the doors and look inside.

The Control Plane is not one thing. It is four components working together.

---

## The Four Components of the Control Plane

```
┌─────────────────────────────────────────────────────────────────┐
│                MAJESTIC CENTRAL CONTROL OFFICE                  │
│                      (Control Plane)                            │
│                                                                 │
│  ┌───────────────┐  ┌──────────┐  ┌────────────┐  ┌─────────┐  │
│  │  API Server   │  │   etcd   │  │ Scheduler  │  │Controller│  │
│  │  (Customer    │  │(Central  │  │(Operations │  │ Manager  │  │
│  │   Service     │  │Database) │  │ Manager)   │  │(Senior   │  │
│  │   Counter)    │  │          │  │            │  │ Officer) │  │
│  └───────────────┘  └──────────┘  └────────────┘  └─────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Kubernetes Concept: API Server

The **API Server** is the **front door** of the entire Kubernetes system. Every request — from you, from other components, from automated systems — goes through the API Server.

Nothing in Kubernetes happens without going through the API Server.

> **BMTC Analogy:** The **Customer Service Counter at Majestic**.
>
> Want to ask about a route? Go to the counter.
> Want to submit a complaint? Go to the counter.
> Want to request a new bus? Go to the counter.
> Internal departments sending updates? They go through the counter.
>
> No one bypasses the counter. Everything is recorded, validated, and processed at the counter.

---

### Kubernetes Concept: etcd

**etcd** is the database of Kubernetes. It stores **everything**:
- What Pods should exist
- What Pods currently exist
- All configurations
- All the state of the cluster

If etcd is lost without backup, the cluster loses all knowledge of itself. This is why etcd is treated with extreme care.

> **BMTC Analogy:** The **Central BMTC Master Database**.
>
> Every route, every bus, every depot location, every driver record, every schedule, every maintenance log. Everything is here. If this database was wiped clean, BMTC would not know how many buses it has, what routes exist, or which depots are operational.

---

### Kubernetes Concept: Scheduler

We covered this in Episode 2, but now you understand the context better.

The **Scheduler** watches for new Pods that have been created but not yet assigned to a Node. It then assigns them to the best available Node.

> **BMTC Analogy:** The **Operations Manager**.
>
> The API Server receives the request: *"New bus needed on Route 500D."* The Scheduler checks all depots, evaluates which has capacity, and says: *"Assign to Yeshwanthpur Depot."*

---

### Kubernetes Concept: Controller Manager

Also covered in Episode 2, with richer context now.

The **Controller Manager** runs multiple control loops simultaneously. Each loop manages a different type of resource.

> **BMTC Analogy:** The **Senior Operations Officer** who constantly monitors all operations and corrects any deviations from the plan.

---

### Kubernetes Concept: Cloud Controller Manager

When Kubernetes runs on a cloud provider (AWS, GCP, Azure), there are external systems to coordinate with:
- Cloud load balancers
- Cloud storage
- Cloud networking
- Cloud node management

The **Cloud Controller Manager** handles this communication with external systems.

> **BMTC Analogy:** The **External Coordination Officer** who interfaces with:
> - Bengaluru Traffic Police (route approvals)
> - BBMP (road conditions and permissions)
> - GPS providers (real-time tracking integration)
> - Fuel suppliers (automated fuel ordering)
>
> These are outside BMTC's direct control. This officer is the bridge.

---

## The Complete Request Flow

Let us trace what happens when you run: *"Deploy 3 copies of the Ticket Booking app"*

```
YOU
 │
 │ kubectl apply -f deployment.yaml
 ▼
┌─────────────────────────────┐
│       API Server            │  ← Receives and validates your request
│  (Customer Service Counter) │
└──────────────┬──────────────┘
               │ stores desired state
               ▼
┌─────────────────────────────┐
│           etcd              │  ← Records: "3 ticket-booking Pods desired"
│      (Master Database)      │
└──────────────┬──────────────┘
               │ Controller Manager notices gap
               ▼
┌─────────────────────────────┐
│    Controller Manager       │  ← "Desired=3, Current=0. Create 3 Pods."
│     (Senior Officer)        │
└──────────────┬──────────────┘
               │ new Pods need placement
               ▼
┌─────────────────────────────┐
│         Scheduler           │  ← Assigns each Pod to best Worker Node
│    (Operations Manager)     │
└──────────────┬──────────────┘
               │ tells each Node
               ▼
┌─────────────────────────────┐
│        Kubelet              │  ← Depot Manager on each Node receives order
│     (Depot Manager)         │
└──────────────┬──────────────┘
               │ instructs
               ▼
┌─────────────────────────────┐
│    Container Runtime        │  ← Mechanic starts the bus
│       (Mechanic)            │
└──────────────┬──────────────┘
               │
               ▼
          Pod Running ✓
```

---

## The Worker Node Internals

We have talked about Worker Nodes (Depots) from the outside. Let us look inside.

### Kubernetes Concept: Kubelet

The **Kubelet** runs on every Worker Node. It receives instructions from the Control Plane and ensures the right Pods are running on its Node.

> **BMTC Analogy:** The **Depot Manager**. The Control Office sends orders. The Depot Manager receives them and makes sure the right buses are dispatched, running, and healthy.

### Kubernetes Concept: Container Runtime

The **Container Runtime** is the software that actually **starts and runs containers**. It does the low-level work of pulling images and starting processes.

> **BMTC Analogy:** The **Mechanic** who physically starts the bus engine, checks the oil, and gets the bus ready to roll. The Depot Manager (Kubelet) gives the order. The Mechanic (Container Runtime) executes it.

### Kubernetes Concept: Kube-proxy

**Kube-proxy** runs on every Node and handles networking. It maintains network rules so that traffic to a Service gets forwarded to the right Pod.

> **BMTC Analogy:** The **depot's traffic marshaller** who directs arriving passenger vehicles to the right bus bay. *"Route 500D passengers? Bay 5. Airport Express? Bay 12."*

---

# EPISODE 10: Advanced Scheduling — Who Goes Where

## The Problem This Episode Solves

Not every bus can go to every depot. Some depots have special requirements. Some buses need special facilities. Some routes work better when buses are spread across multiple depots (so one depot failure does not kill the entire route).

Kubernetes has a rich system for controlling exactly where Pods are placed.

---

## Resource Management

### Kubernetes Concept: Resource Requests

When you create a Pod, you can tell Kubernetes: *"This Pod needs at least 2 CPUs and 4GB of RAM to run properly."*

This is a **Resource Request**. Kubernetes uses it when scheduling — it will only place the Pod on a Node that has at least that much available.

> **BMTC Analogy:** **Reserved resources for a bus**.
>
> *"Bus route 500D requires: 1 dedicated bay at the depot, fuel allocation for 200km, 1 assigned driver."*
>
> The operations manager only assigns this bus to a depot that can meet these requirements.

### Kubernetes Concept: Resource Limits

A **Resource Limit** sets the **maximum** a Pod can use. Even if more is available, the Pod cannot exceed this limit.

> **BMTC Analogy:** **Maximum allowed fuel consumption**.
>
> A bus is allocated fuel for 200km. Even if there is more fuel available at the depot, this bus cannot take more than its limit. This ensures resources are fairly distributed.

```
Resource Request = Minimum needed (guaranteed)
Resource Limit   = Maximum allowed (cannot exceed)
```

---

## Controlling Pod Placement

### Kubernetes Concept: Taints and Tolerations

**Taints** are marks on a Node that say: *"Normal Pods cannot be scheduled here."*

**Tolerations** are marks on a Pod that say: *"I can handle this taint. I am allowed to go there."*

> **BMTC Analogy:**
>
> **Taint:** Yeshwanthpur Charging Depot puts up a sign: *"Only Electric Buses Allowed."* Regular diesel buses cannot enter.
>
> **Toleration:** The electric bus has the right credentials. It can enter the charging depot. The diesel bus does not have a toleration for this taint — it stays out.

```
Taint on Node       =  "Electric buses only" sign on depot
Toleration on Pod   =  Electric bus credentials that allow entry
```

### Kubernetes Concept: Node Selector

The simplest placement rule. You say: *"Put this Pod only on Nodes with this specific label."*

> **BMTC Analogy:** *"Assign this bus to Whitefield Depot only."* The operations manager does not consider any other depot for this bus.

### Kubernetes Concept: Affinity and Anti-Affinity

**Affinity:** *"Try to place these Pods near each other (on the same Node or nearby Nodes)."*

**Anti-Affinity:** *"Try to keep these Pods away from each other."*

> **BMTC Analogy:**
>
> **Affinity:** *"Keep the ticket booking buses and the payment processing buses in the same depot so they can communicate quickly."*
>
> **Anti-Affinity:** *"Do not park all Route 500D buses in the same depot. Spread them across Shivajinagar, Yeshwanthpur, and Bannerghatta depots. If one depot has a problem, we still have buses at the other two."*

Anti-Affinity is especially important for **high availability** — spreading your application across multiple Nodes so one Node failure does not take down your entire application.

---

## Episode 10 Summary

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Resource Request | Minimum fuel, bay, driver needed | Minimum CPU/Memory guaranteed |
| Resource Limit | Maximum fuel allowed | Maximum CPU/Memory the Pod can use |
| Taint | "Electric buses only" depot sign | Node restriction marker |
| Toleration | Electric bus credentials | Pod's permission to enter tainted Node |
| Node Selector | "Whitefield Depot only" | Place Pod on specific labeled Node |
| Affinity | Keep buses together in same depot | Place Pods near each other |
| Anti-Affinity | Spread buses across depots | Keep Pods apart for high availability |

---

# COMPLETE REFERENCE: The Full Map

## Every Concept in One Place

| Kubernetes Concept | BMTC Analogy | What It Does |
|-------------------|-------------|-------------|
| Cluster | Entire BMTC System | Group of machines working as one |
| Control Plane | Majestic Central Office | Brain of Kubernetes |
| Worker Node | BMTC Depot | Machine where apps run |
| Pod | BMTC Bus | Smallest runnable unit |
| Container | Bus Driver | The actual application |
| Image | Bus Blueprint | Packaged application |
| Registry | Bus Factory/Warehouse | Stores Images |
| Deployment | Operations Plan | Desired state declaration |
| ReplicaSet | Supervising Officer | Ensures correct Pod count |
| Replica | Each dispatched bus | One copy of the app |
| StatefulSet | Reserved numbered airport buses | Pods with stable identity |
| DaemonSet | One guard per depot | One Pod per Node |
| Job | One-time festival shuttle | Task with defined end |
| CronJob | Daily 5 AM airport shuttle | Scheduled recurring task |
| Service | Bus Stop | Stable entry point to Pods |
| Endpoints | Buses currently at the stop | Current list of Pods behind Service |
| Ingress | Majestic main entrance | Routes external traffic |
| Ingress Controller | Traffic officer at entrance | Implements Ingress rules |
| Namespace | BMTC service division | Cluster partition |
| Labels | Stickers on buses | Key-value identification tags |
| Selectors | Rules to find buses by sticker | Queries resources by label |
| Annotations | Staff notes in bus file | Extra metadata for tools |
| ConfigMap | Route board and timetable | Non-sensitive configuration |
| Secret | Driver keys and fuel card | Sensitive data |
| Volume | Luggage compartment | Storage attached to Pod |
| Persistent Volume | BMTC garage | Storage independent of Pod |
| PVC | Depot's garage request | Pod's storage request |
| StorageClass | Type of garage | Type of storage |
| API Server | Customer Service Counter | Entry point for all requests |
| etcd | Central BMTC Database | Stores all cluster state |
| Scheduler | Operations Manager | Assigns Pods to Nodes |
| Controller Manager | Senior Operations Officer | Runs control loops |
| Cloud Controller Manager | External coordination officer | Interfaces with cloud providers |
| Kubelet | Depot Manager | Manages Pods on each Node |
| Container Runtime | Mechanic | Starts containers |
| Kube-proxy | Depot traffic marshaller | Handles networking on Node |
| Liveness Probe | Is engine running? | Kills unhealthy Pod |
| Readiness Probe | Are doors open? | Removes unready Pod from traffic |
| Startup Probe | Has warm-up finished? | Waits for slow-starting app |
| Rolling Update | Replace buses one at a time | Zero-downtime deployment |
| Rollback | Bring back old buses | Revert to previous version |
| HPA | Add buses when queue grows | Auto-scale Pods by load |
| VPA | Upgrade to bigger bus | Auto-resize Pod resources |
| Resource Request | Minimum bay/fuel/driver needed | Minimum CPU/Memory |
| Resource Limit | Maximum fuel allowed | Maximum CPU/Memory |
| Taint | "Electric only" depot sign | Node restriction |
| Toleration | Electric bus credentials | Pod permission for tainted Node |
| Node Selector | "Whitefield Depot only" | Place Pod on labeled Node |
| Affinity | Keep buses in same depot | Place Pods together |
| Anti-Affinity | Spread buses across depots | Keep Pods apart |
| RBAC | Job titles and authority | Permission system |
| Service Account | Bus official ID card | Pod's identity in cluster |
| Network Policy | Lane entry rules | Controls Pod communication |
| Admission Controller | Pre-service safety checkpoint | Validates API requests |

---

# LEARNING ROADMAP

## Your 9-Episode Journey

```
EPISODE 1: The Big Picture
What is Kubernetes? What are its main parts?
Cluster → Control Plane → Worker Nodes → Pods → Containers
"Understand the city before driving in it"

         ↓

EPISODE 2: Management and Reliability
How does Kubernetes keep things running?
Deployments → ReplicaSets → Scheduler → Self-Healing → Scaling
"The bus dispatch system"

         ↓

EPISODE 3: Networking Basics
How do users and apps find each other?
Service → Endpoints → Ingress → DNS
"Bus stops, entrances, and directions"

         ↓

EPISODE 4: Configuration and Storage
How do apps get their config and store data?
ConfigMap → Secret → Volume → PV → PVC
"What buses need to operate"

         ↓

EPISODE 5: Organization
How do we organize hundreds of resources?
Namespace → Labels → Selectors → Annotations
"Departments, stickers, and filing systems"

         ↓

EPISODE 6: Special Workloads
What about databases, scheduled tasks, one-time jobs?
StatefulSet → DaemonSet → Job → CronJob
"Special bus services"

         ↓

EPISODE 7: Health and Updates
How do we keep apps healthy and update without downtime?
Probes → Rolling Updates → Rollback → HPA → VPA
"Bus health checks and fleet management"

         ↓

EPISODE 8: Security
Who can access what? How is traffic controlled?
RBAC → Service Account → Network Policy → Admission Controller
"ID cards, permissions, and checkpoints"

         ↓

EPISODE 9 + 10: Deep Internals
How does Kubernetes actually work under the hood?
API Server → etcd → Scheduler → Controller Manager
Taints → Affinity → Resource Management
"Inside the control office"
```

---

# QUICK MENTAL TESTS

## Use These to Check Your Understanding

After each episode, ask yourself these questions. If you can answer them using the BMTC analogy, you understand the concept.

**Episode 1:**
- Why is a Cluster like the entire BMTC system rather than just one depot?
- What is the difference between the Control Plane and a Worker Node?
- If a Container is the driver, what is the Pod?

**Episode 2:**
- If I ask for 5 replicas and 2 crash, what happens automatically?
- What is the difference between a Deployment and a ReplicaSet?
- The Scheduler makes one decision for every Pod. What decision is that?

**Episode 3:**
- Why would you use a Service instead of connecting directly to a Pod?
- What is the difference between a Service and an Ingress?
- If a Pod is removed from the cluster, what happens to the Endpoints list?

**Episode 4:**
- Why would you use a Secret instead of a ConfigMap for a database password?
- What happens to data in a regular Volume when the Pod is deleted?
- What is the difference between a PV and a PVC?

**Episode 5:**
- Two teams are using the same Kubernetes cluster. How do they avoid interfering with each other?
- A Service needs to find all Pods running the ticket-booking app. What does it use?
- What is the difference between a Label and an Annotation?

**Episode 6:**
- When would you use a StatefulSet instead of a Deployment?
- A DaemonSet is deployed and the cluster adds a new Node. What happens automatically?
- What is the difference between a Job and a CronJob?

**Episode 7:**
- A Pod is running but not responding to requests. Which probe would catch this?
- A new Pod just started but is still connecting to the database. Should traffic be sent to it?
- Rolling Update replaces 1 Pod at a time. Why is this better than replacing all at once?

**Episode 8:**
- A developer should be able to read Pods but not delete them. What Kubernetes feature handles this?
- A Pod needs to query the Kubernetes API. What identity does it use?
- By default, Pod A can talk to Pod B. How would you block this?

---

# FINAL NOTE FOR THE READER

You have now covered every major Kubernetes concept.

Here is the most important thing to remember:

**Kubernetes solves problems that every large system faces.** The BMTC system faces the same challenges as a global software company:
- How do you ensure services never go down?
- How do you handle increasing demand?
- How do you update systems without disrupting users?
- How do you keep things organized as scale grows?

Every Kubernetes component exists because someone had a specific problem that needed solving. When you understand *why* each piece exists, the *what* and *how* become much easier to remember.

The BMTC story is not just a memory trick. It is a reminder that good systems design — whether for buses or software — follows the same principles: **clarity, reliability, scalability, and automation**.

---

*This guide is designed to be revisited. Return to any episode when you encounter that concept in real work. The BMTC analogy will always be here to orient you.*