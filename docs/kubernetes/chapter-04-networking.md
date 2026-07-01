---
title: "Chapter 4: Networking"
sidebar_position: 4
description: Service, Endpoints, Ingress, Ingress Controller, DNS
---

# Chapter 4: Networking

## The Problem This Chapter Solves

Buses are running. Great. But passengers need a way to board them.

You cannot tell passengers: *"Go find bus KA-57-F-1234 parked somewhere in the city."* That makes no sense. Passengers need a **fixed, stable location** to go to. A bus stop.

Kubernetes has the same problem. Your applications (Pods) change all the time. They crash and get replaced with new names. They scale up and down. You cannot tell other applications or users: *"Go find Pod xyz-ab123 somewhere in the cluster."*

You need something stable. That is what this chapter explains.

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

```text
Silk Board Bus Stop  =  Kubernetes Service
Route 500D buses     =  Pods behind the Service
Passenger            =  User or other application making a request
```

```bash
# Create a Service for your deployment
kubectl expose deployment bus-app --port=80 --target-port=8080

# List all services
kubectl get services

# Get detailed info about a service
kubectl describe service bus-app

# Access a service (if running in cluster)
kubectl port-forward service/bus-app 8080:80
```

---

## Part 2: Which Buses Are Currently at the Stop?

### Kubernetes Concept: Endpoints

Behind every Service, Kubernetes maintains a list of the actual Pods currently available to receive traffic. This list is called **Endpoints**.

The list is **dynamic** — it updates automatically when Pods are added, removed, or crash.

> **BMTC Analogy:** The **list of buses currently serving Silk Board Bus Stop** at this moment. Right now it might be buses KA-01-F-1111, KA-01-F-2222, and KA-01-F-3333. Ten minutes later, one might have moved on and a new one arrived. The list keeps changing, but the bus stop itself stays in the same place.

```bash
# View the endpoints behind a service
kubectl get endpoints

# Watch endpoints update in real time
kubectl get endpoints --watch
```

---

## Part 3: Entering the City — Main Gateway

### Kubernetes Concept: Ingress

A **Service** handles traffic to one specific application. But what if users from **outside** the cluster need to reach your applications?

Kubernetes has a component called **Ingress** that acts as a smart main entrance. It receives all incoming traffic and routes it to the right Service based on rules you define.

> **BMTC Analogy:** **Majestic Bus Terminal main entrance**.
>
> You arrive at Majestic from outside the city. You walk through the main entrance. Signs and staff direct you: *"Airport buses at Platform 18. Mysuru buses at Platform 12. Whitefield buses at Platform 5."*
>
> You entered through one gate. You were routed to the right destination.

```yaml
# ingress.yaml — define routing rules
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: bmtc-routes
spec:
  rules:
    - host: tickets.bmtc.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ticket-service
                port:
                  number: 80
    - host: tracking.bmtc.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: tracking-service
                port:
                  number: 80
```

### Kubernetes Concept: Ingress Controller

The Ingress just defines the **rules**. Something needs to actually **implement** those rules.

> **BMTC Analogy:** The **traffic officer standing at the Majestic entrance** who actually reads the signs and physically directs passengers to the correct platform.

```text
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

## Traffic Flow: From Outside World to Pod

```mermaid
graph LR
    USER["User/Client"] -->|"tickets.bmtc.com"| INGRESS["Ingress<br/>(Majestic Entrance)"]
    INGRESS -->|routes to"| SVC["Service: ticket-service<br/>(Bus Stop)"]
    SVC -->|"forwards to"| EP["Endpoints<br/>(Buses at stop)"]
    EP --> POD1["Pod 1<br/>(Bus KA-01)"]
    EP --> POD2["Pod 2<br/>(Bus KA-02)"]
    EP --> POD3["Pod 3<br/>(Bus KA-03)"]

    style USER fill:#e1f5fe
    style INGRESS fill:#fff3e0
    style SVC fill:#e8f5e9
```

---

## Chapter 4 Summary

| Term | BMTC Meaning | Kubernetes Meaning |
|------|-------------|-------------------|
| Service | Bus Stop | Stable entry point to a set of Pods |
| Endpoints | List of buses at the stop right now | Current list of Pods behind a Service |
| Ingress | Majestic Main Entrance | Routes external traffic to Services |
| Ingress Controller | Traffic officer at entrance | Implements Ingress rules |
| DNS | City route directory | Name-to-address translation inside cluster |

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
  {
    id: 1,
    question: "Why do we need a Service instead of connecting directly to a Pod?",
    options: [
      "Services are faster than direct Pod connections",
      "Pods are temporary and change frequently; a Service provides a stable endpoint",
      "Services provide encryption that Pods do not",
      "Pods cannot have IP addresses",
    ],
    correct: 1,
    explanation: "Pods crash, scale, and get replaced with new names/IPs. A Service is like a bus stop — it stays in the same place even as different buses (Pods) come and go.",
  },
  {
    id: 2,
    question: "What is the difference between a Service and an Ingress?",
    options: [
      "They are exactly the same thing",
      "A Service handles internal cluster traffic; Ingress handles external traffic with smart routing rules",
      "An Ingress is a type of Service",
      "A Service is for Pods, Ingress is for Nodes",
    ],
    correct: 1,
    explanation: "A Service is a bus stop (one fixed endpoint). Ingress is the main Majestic terminal entrance that can route users to different bus stops based on rules (like which bus route they want).",
  },
  {
    id: 3,
    question: "What happens to the Endpoints list when a Pod crashes?",
    options: [
      "Nothing — the list stays the same",
      "The crashed Pod is automatically removed and the list updates",
      "The entire Service stops working",
      "The Endpoints must be manually updated by an administrator",
    ],
    correct: 1,
    explanation: "Endpoints dynamically update — when a Pod crashes or is removed, it is automatically taken off the list. When a new Pod starts, it is added. The list always reflects current available Pods.",
  },
  {
    id: 4,
    question: "What does the Ingress Controller do?",
    options: [
      "It stores the Ingress rules in etcd",
      "It implements the Ingress rules by actually routing traffic",
      "It creates Pods for you",
      "It manages database connections",
    ],
    correct: 1,
    explanation: "The Ingress object defines routing rules (like signboards), but the Ingress Controller is the traffic officer who actually reads those rules and directs incoming traffic to the correct Services.",
  },
]} />
