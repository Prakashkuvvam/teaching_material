---
title: "Chapter 13 — Checking the Records (Data Sources)"
sidebar_position: 13
description: "By the end of this chapter, you will be able to: Use data sources to read existing information"
---

## 📖 Story First

Ramesh wants to add a solar panel system to the house.

The solar panel contractor asks: *"What is the current electricity meter number and what is the sanctioned load?"*

TerraBuilders does not create this information. They **look up the existing records** — the BESCOM records, the existing house electrical data — and give the solar contractor what they need. They are reading existing information, not creating new things.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Use data sources to read existing infrastructure information
- ✅ Understand the difference between resources and data sources
- ✅ Use data sources for AMI lookup, existing VPCs, and more

---

## ☁️ The Actual Concept

**Data Sources** allow Terraform to **read information** from external systems without creating or managing those resources.

### Key Difference

```
resource "aws_instance" "server" { }
→ CREATE a new server (TerraBuilders builds something new)

data "aws_ami" "latest" { }
→ READ existing information (TerraBuilders looks up records)
```

### Common Data Source Examples

```hcl
# Find the latest Amazon Linux AMI
data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Look up an existing VPC
data "aws_vpc" "existing" {
  tags = {
    Name = "existing-sharma-vpc"
  }
}

# Get current AWS account info
data "aws_caller_identity" "current" {}
```

### Using Data Sources in Resources

```hcl
resource "aws_instance" "web_server" {
  ami       = data.aws_ami.latest_amazon_linux.id
  subnet_id = data.aws_vpc.existing.id
}
```

---

## 🧪 Hands-On — Use a Data Source

```
STEP 1: Add a data source to find the latest Amazon Linux AMI:

         data "aws_ami" "amazon_linux" {
           most_recent = true
           owners      = ["amazon"]

           filter {
             name   = "name"
             values = ["amzn2-ami-hvm-*-x86_64-gp2"]
           }
         }

STEP 2: Use it in your instance:

         resource "aws_instance" "web_server" {
           ami           = data.aws_ami.amazon_linux.id
           instance_type = var.instance_type
         }

STEP 3: Run terraform plan to see the resolved AMI ID.

✅ You are no longer hardcoding AMI IDs!
   Terraform looks up the latest one automatically.
   Like TerraBuilders checking BESCOM records instead of
   guessing the meter number.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What is the purpose of a data source?",
        "options": [
            "To create new infrastructure resources",
            "To read existing information without managing it",
            "To delete infrastructure",
            "To format your configuration"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "How do you reference a data source attribute?",
        "options": [
            "resource.type.name.attribute",
            "data.type.name.attribute",
            "var.type.name.attribute",
            "local.type.name.attribute"
        ],
        "correct": 1,
        "explanation": "Data sources are referenced as data.type.name.attribute"
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│           CHAPTER 13 SUMMARY                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Data sources = read existing information            │
│  ✅ Do NOT create anything — just query                 │
│  ✅ Common uses: AMI lookup, existing VPCs, account ID  │
│  ✅ Reference: data.type.name.attribute                 │
│  ✅ Unlike resources which CREATE, data sources READ    │
│  ✅ Like checking BESCOM records for meter number       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
