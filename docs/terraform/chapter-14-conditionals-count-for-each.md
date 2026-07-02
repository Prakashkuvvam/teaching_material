---
title: "Chapter 14 — Making Decisions (Conditionals & Count)"
sidebar_position: 14
description: "By the end of this chapter, you will be able to: Use conditionals and count/for_each"
---

## 📖 Story First

TerraBuilders manages houses for many clients: budget, standard, and premium.

The requirements template says: *"If budget category is Premium, install marble flooring. Otherwise, install standard tiles."*

Also: *"Install one ceiling fan per bedroom."* If the house has 3 bedrooms, install 3 fans.

And: *"Each room gets a ceiling fan, but different rooms get different fan sizes."*
- Master bedroom → 52-inch fan
- Guest bedroom → 44-inch fan
- Study → 36-inch fan

These are conditionals (`if`) and repetition (`count`, `for_each`) — essential tools.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Use conditional expressions for if-else logic
- ✅ Use `count` to create multiple identical resources
- ✅ Use `for_each` to create resources from a map
- ✅ Combine these for flexible configurations

---

## ☁️ The Actual Concept

### Conditional Expressions

```hcl
# Syntax: condition ? value_if_true : value_if_false

variable "budget_category" {
  default = "Standard"
}

resource "aws_instance" "web_server" {
  # Premium → large server, Standard → small server
  instance_type = var.budget_category == "Premium" ? "t3.large" : "t2.micro"

  # Premium → more storage
  root_block_device {
    volume_size = var.budget_category == "Premium" ? 100 : 20
  }
}
```

### Count — Multiple Identical Resources

```hcl
variable "bedroom_count" {
  default = 3
}

# Create one server per bedroom
resource "aws_instance" "bedroom_server" {
  count         = var.bedroom_count
  ami           = "ami-0abcdef1234567890"
  instance_type = "t2.micro"

  tags = {
    Name = "server-${count.index + 1}"   # server-1, server-2, server-3
  }
}
```

### For Each — Resources from a Map

```hcl
variable "rooms" {
  default = {
    master_bedroom = "t3.large"
    guest_bedroom  = "t2.micro"
    study          = "t2.small"
  }
}

resource "aws_instance" "room_server" {
  for_each      = var.rooms

  ami           = "ami-0abcdef1234567890"
  instance_type = each.value    # Different type for each room

  tags = {
    Name = "server-${each.key}"   # server-master_bedroom, etc.
  }
}
```

---

## 🧪 Hands-On — Use Conditionals and Count

```
STEP 1: Add variables:

         variable "environment" { default = "dev" }
         variable "server_count" { default = 2 }

STEP 2: Use conditional for instance type:

         resource "aws_instance" "web" {
           count         = var.server_count
           instance_type = var.environment == "prod" ? "t3.medium" : "t2.micro"
           ami           = "ami-0abcdef1234567890"
           tags = {
             Name = "web-${count.index + 1}"
           }
         }

STEP 3: Apply:
         - With environment=dev: Creates 2 t2.micro instances
         - With environment=prod: Creates 2 t3.medium instances

✅ If-else logic and repetition working!
   Like installing fans in each bedroom.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What does count do in a resource block?",
        "options": [
            "Creates multiple instances of the resource",
            "Counts how many resources exist",
            "Limits the number of API calls",
            "Specifies the resource priority"
        ],
        "correct": 0,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What is the conditional expression syntax in Terraform?",
        "options": [
            "if condition then value1 else value2",
            "condition ? value1 : value2",
            "condition ? value1 else value2",
            "condition ?: value1 ?: value2"
        ],
        "correct": 1,
        "explanation": "condition ? value_if_true : value_if_false"
    },
    {
        "id": 3,
        "question": "When would you use for_each instead of count?",
        "options": [
            "When you need to create multiple identical resources",
            "When each instance needs different configuration from a map",
            "for_each is deprecated in favor of count",
            "They are interchangeable"
        ],
        "correct": 1,
        "explanation": "Use for_each when resources need different configs, count when they are identical."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│           CHAPTER 14 SUMMARY                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Conditionals: condition ? true_val : false_val      │
│  ✅ count = Create N identical resources                │
│  ✅ count.index = Access current index (0-based)        │
│  ✅ for_each = Create resources from a map              │
│  ✅ each.key and each.value in for_each blocks          │
│  ✅ Like: "if premium→marble / standard→tiles"          │
│  ✅ Like: "one fan per bedroom" (count)                  │
│  ✅ Like: "different fan sizes per room" (for_each)     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
