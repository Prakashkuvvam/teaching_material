---
title: "Chapter 9 — Finishing & Reporting (Outputs)"
sidebar_position: 9
description: "By the end of this chapter, you will be able to: Use outputs to display infrastructure information"
---

## 📖 Story First

The house is complete.

The Sharma family now needs certain information:
- *"What is the official postal address of the house?"*
- *"What is the electricity meter number?"*
- *"What is the water connection number?"*

These were all generated *during* construction. The Sharma family did not know them in advance. TerraBuilders compiled them and handed over a **Completion Report** with all the important numbers.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Define outputs to display resource attributes
- ✅ Mark outputs as sensitive when needed
- ✅ Use outputs to pass data between modules

---

## ☁️ The Actual Concept

**Outputs** display important information after `terraform apply` completes:

```hcl
# outputs.tf
output "web_server_ip" {
  description = "The public IP of the web server"
  value       = aws_instance.web_server.public_ip
}

output "database_endpoint" {
  description = "Database connection endpoint"
  value       = aws_db_instance.main.endpoint
}

# Sensitive output — masked in logs
output "database_password" {
  description = "Database admin password"
  value       = aws_db_instance.main.password
  sensitive   = true
}
```

### Usage

```bash
$ terraform apply

Outputs:
web_server_ip     = "13.235.78.92"
database_endpoint = "db.ap-south-1.rds.amazonaws.com:5432"
database_password = <sensitive>
```

### Query Specific Outputs

```bash
$ terraform output web_server_ip
13.235.78.92
```

---

## 🧪 Hands-On — Create Outputs

```
STEP 1: Create outputs.tf:

         output "instance_id" {
           description = "ID of the web server"
           value       = aws_instance.web_server.id
         }

         output "public_ip" {
           description = "Public IP of the web server"
           value       = aws_instance.web_server.public_ip
         }

         output "vpc_id" {
           description = "ID of the created VPC"
           value       = aws_vpc.sharma_vpc.id
         }

STEP 2: Run terraform apply and see the outputs displayed.

STEP 3: Query a specific output:
         $ terraform output public_ip

✅ The completion report is ready!
   Anyone can view the important details of your infrastructure.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What do Terraform outputs display?",
        "options": [
            "Errors during terraform apply",
            "Important resource attributes after creation",
            "The content of all .tf files",
            "The provider configuration"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What does setting sensitive = true on an output do?",
        "options": [
            "Encrypts the output value",
            "Hides the value from logs and console output",
            "Deletes the value after display",
            "Makes the value available only to admins"
        ],
        "correct": 1,
        "explanation": "sensitive = true masks the output value in logs and terminal output."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│              CHAPTER 9 SUMMARY                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Outputs = Completion report for infrastructure      │
│  ✅ Displayed after terraform apply                     │
│  ✅ Use sensitive = true for secrets                    │
│  ✅ Query with terraform output <name>                  │
│  ✅ Also used to pass data between modules              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
