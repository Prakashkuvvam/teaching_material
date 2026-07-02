---
title: "Chapter 11 — Building Order (Dependencies)"
sidebar_position: 11
description: "By the end of this chapter, you will be able to: Understand Terraform's dependency graph"
---

## 📖 Story First

A new worker arrives on site and asks: *"Sir, should I start painting the walls?"*

Ramesh looks confused: *"The walls are not even built yet. How can you paint them?"*

In construction, **order matters fundamentally**:
1. Foundation must come before walls
2. Walls must come before the roof
3. Roof must come before interior work
4. Interior must come before painting

If you try to do step 4 before step 1, disaster.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Understand implicit vs explicit dependencies
- ✅ Use `depends_on` for manual dependency declaration
- ✅ Read Terraform's dependency graph

---

## ☁️ The Actual Concept

### Implicit Dependencies (Automatic)

Terraform analyzes references to determine build order:

```hcl
# Terraform knows: Create VPC first, then subnet, then instance
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "web" {
  vpc_id     = aws_vpc.main.id      # References VPC → creates dependency
  cidr_block = "10.0.1.0/24"
}

resource "aws_instance" "web_server" {
  subnet_id = aws_subnet.web.id     # References subnet → creates dependency
  ami       = "ami-0abcdef1234567890"
}
```

### Explicit Dependencies (Manual)

When Terraform cannot infer the dependency:

```hcl
resource "aws_s3_bucket" "logs" {
  bucket = "sharma-logs"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t2.micro"

  # The server uses the bucket for logs in its application
  # but the code does not directly reference it
  depends_on = [aws_s3_bucket.logs]
}
```

### Dependency Graph

```bash
# Generate a visual dependency graph
$ terraform graph | dot -Tpng > graph.png
```

---

## 🧪 Hands-On — View Dependencies

```
STEP 1: In your main.tf, create resources with references:

         resource "aws_vpc" "main" {
           cidr_block = "10.0.0.0/16"
         }

         resource "aws_subnet" "web" {
           vpc_id     = aws_vpc.main.id
           cidr_block = "10.0.1.0/24"
         }

         resource "aws_instance" "web" {
           subnet_id = aws_subnet.web.id
           ami       = "ami-0abcdef1234567890"
         }

STEP 2: Run terraform graph to see the dependency tree:

         $ terraform graph
         (Shows the dependency graph in DOT format)

STEP 3: To visualize, install graphviz and generate an image:
         $ terraform graph | dot -Tpng > graph.png

✅ You can see exactly how Terraform orders resource creation!
   Foundation → Walls → Paint. Always in the right order.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "How does Terraform automatically determine resource creation order?",
        "options": [
            "It creates resources in the order they appear in the file",
            "It analyzes references to determine implicit dependencies",
            "It creates all resources in parallel",
            "It asks the user for the order"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "When should you use depends_on?",
        "options": [
            "For every resource to ensure correct ordering",
            "Only when Terraform cannot automatically detect a dependency",
            "Only for AWS resources",
            "depends_on is deprecated"
        ],
        "correct": 1,
        "explanation": "Use depends_on only when Terraform cannot automatically infer the dependency."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 11 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Terraform auto-detects dependencies via references  │
│  ✅ Implicit: Reference another resource's attribute    │
│  ✅ Explicit: Use depends_on for non-obvious deps       │
│  ✅ Dependency graph: terraform graph                   │
│  ✅ Always build in correct order — like construction   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
