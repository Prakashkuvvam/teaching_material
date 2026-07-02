---
title: "Chapter 12 — Same Blueprint, Different Houses (Workspaces)"
sidebar_position: 12
description: "By the end of this chapter, you will be able to: Use workspaces for multiple environments"
---

## 📖 Story First

The Sharma house is complete. The family decides to build a second property — a rental house on another plot in Indiranagar.

The requirements are almost identical. Same design, same structure. But:
- Different location
- Different connection numbers
- Separate as-built records

TerraBuilders does not want to create an entirely separate project folder. They reuse the same blueprint but keep the records completely separate.

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- ✅ Create and switch between workspaces
- ✅ Use workspace names in configurations
- ✅ Understand the dev/staging/prod pattern

---

## ☁️ The Actual Concept

**Workspaces** allow you to use the **same configuration** to manage **multiple separate environments** — each with its own state file.

### Common Pattern: dev/staging/prod

```bash
# Create workspaces for different environments
$ terraform workspace new dev
$ terraform workspace new staging
$ terraform workspace new prod

# Switch between them
$ terraform workspace select dev
$ terraform workspace select prod

# List all workspaces
$ terraform workspace list
  default
  dev
* prod    # * marks current workspace
```

### Using Workspace in Configuration

```hcl
resource "aws_instance" "web_server" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t2.micro"

  tags = {
    Name        = "sharma-${terraform.workspace}-server"
    Environment = terraform.workspace
  }
}
```

### Each Workspace Has Its Own State

```
terraform.tfstate.d/
├── dev/
│   └── terraform.tfstate      ← Dev records
├── staging/
│   └── terraform.tfstate      ← Staging records
└── prod/
    └── terraform.tfstate      ← Prod records
```

---

## 🧪 Hands-On — Create Workspaces

```
STEP 1: Create workspaces:
         $ terraform workspace new development
         $ terraform workspace new production

STEP 2: Switch to development and apply:
         $ terraform workspace select development
         $ terraform apply

STEP 3: Switch to production and apply:
         $ terraform workspace select production
         $ terraform apply

         Both use the same .tf files, but have separate
         state files and separate infrastructure.

STEP 4: List resources in each workspace:
         $ terraform workspace select development
         $ terraform state list

         $ terraform workspace select production
         $ terraform state list

✅ Same blueprint. Different houses. Separate records.
   This is exactly dev/staging/prod in the real world.
```

---

## ❓ Quick Quiz

import Quiz from '@site/src/components/Quiz';

<Quiz questions={[
    {
        "id": 1,
        "question": "What problem do workspaces solve?",
        "options": [
            "They allow multiple people to edit the same .tf files simultaneously",
            "They let you manage multiple environments with the same configuration",
            "They automatically deploy infrastructure",
            "They encrypt your state file"
        ],
        "correct": 1,
        "explanation": ""
    },
    {
        "id": 2,
        "question": "What is different between workspaces?",
        "options": [
            "The .tf configuration files",
            "The state file (each workspace has its own)",
            "The Terraform binary version",
            "The provider plugins"
        ],
        "correct": 1,
        "explanation": "Each workspace has its own state file, so the same config creates separate infrastructure."
    },
    {
        "id": 3,
        "question": "How do you reference the current workspace name in configuration?",
        "options": [
            "var.workspace",
            "terraform.workspace",
            "local.workspace",
            "env.workspace"
        ],
        "correct": 1,
        "explanation": "Use terraform.workspace to reference the current workspace name."
    }
]} />

---

## 📝 Chapter Summary

```
┌─────────────────────────────────────────────────────────┐
│            CHAPTER 12 SUMMARY                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Workspaces = multiple envs, same config             │
│  ✅ Each workspace has its own state file               │
│  ✅ Common: dev, staging, production                    │
│  ✅ Reference: terraform.workspace in config            │
│  ✅ Commands: workspace new, select, list               │
│  ✅ Same blueprint, separate as-built records           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
---
---
