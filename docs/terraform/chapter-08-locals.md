---
title: "Chapter 8 — The Architect's Calculations (Locals)"
sidebar_position: 8
description: "By the end of this chapter, you will be able to: Use local values for internal calculations"
---

## 📖 Story First

In the requirements, Ramesh wrote: *"The house should have parking for 2 cars."*

TerraBuilders calculates internally: 2 cars × 13 feet per car = 26 feet of parking width needed. They use this number in multiple places — for the gate width, the driveway, the compound wall gap.

But this calculation (2 × 13 = 26) is an **internal working** of TerraBuilders. Ramesh does not specify 26. TerraBuilders figures it out themselves.

These are internal calculations that are not directly specified by the client but are computed from other values.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Define local values to simplify configurations
- ✅ Use locals for computed values and reuse
- ✅ Understand the difference between variables and locals

---

## ☁️ The Actual Concept

**Locals** are values that you compute inside your Terraform configuration and reuse in multiple places. They are not passed in from outside (like variables) — they are calculated internally.

```hcl
# locals.tf
locals {
  parking_width  = var.car_count * 13
  house_name     = "Sharma-${var.house_location}"
  common_tags = {
    Owner     = "Sharma Family"
    Project   = "Dream House"
    ManagedBy = "TerraBuilders"
  }
}

# Use local values in resources
resource "aws_instance" "web" {
  tags = merge(local.common_tags, {
    Name = local.house_name
  })
}
```

### Variables vs Locals

| Aspect | Variables | Locals |
|--------|-----------|--------|
| Input from outside | ✅ Yes | ❌ No |
| Computed internally | ❌ No | ✅ Yes |
| Can reference other locals | ❌ No | ✅ Yes |
| Used for reuse | ✅ Yes | ✅ Yes |

---

## 🧪 Hands-On — Use Locals

```
STEP 1: Create locals.tf in your project:

         locals {
           environment_name = var.environment
           name_prefix      = "Sharma-${var.environment}"
           common_tags = {
             Environment = var.environment
             ManagedBy   = "Terraform"
             Project     = "Sharma-House"
           }
         }

STEP 2: Update main.tf to use locals:

         resource "aws_instance" "web_server" {
           ami           = "ami-0abcdef1234567890"
           instance_type = var.instance_type
           tags = merge(local.common_tags, {
             Name = "${local.name_prefix}-Web"
           })
         }

✅ Your configuration is simpler and more maintainable!
   Change the prefix once in locals, and all resources update.
```

---

## 💡 Pro Tip

> 💡 **Tip:** Use locals for any value that is computed from other values. If you find yourself repeating the same expression in multiple places, extract it to a local.

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What is the difference between variables and locals?",
        "options": [
            "Variables are defined internally, locals are inputs",
            "Variables are inputs from outside, locals are computed internally",
            "There is no difference",
            "Locals are used only in modules"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "How do you reference a local value named 'name_prefix'?",
        "options": [
            "var.name_prefix",
            "local.name_prefix",
            "locals.name_prefix",
            "name_prefix"
        ],
        "correct": 1,
        "explanation": "Locals are referenced as local.name_prefix."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│              CHAPTER 8 SUMMARY                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Locals = internal computed values                   │
│  ✅ Reduce repetition by computing once                 │
│  ✅ Reference as local.name                             │
│  ✅ Variables = inputs, Locals = calculations            │
│  ✅ Great for common tags, name prefixes, derived values│
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
