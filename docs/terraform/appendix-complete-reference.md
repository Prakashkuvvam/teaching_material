---
title: "Appendix — Complete Reference"
sidebar_position: 23
description: "Complete concept mapping and command reference"
---

## 🗺️ Every Concept Mapped

| Terraform Concept | House Building Analogy | What It Does |
|------------------|----------------------|-------------|
| Infrastructure as Code | Written requirements document | Define infrastructure in files |
| Declarative | Describe desired outcome, not steps | Say what you want, not how |
| `.tf` files | Requirements document pages | Configuration files |
| HCL | Standard form format | Terraform's language |
| `terraform init` | Site setup, contractor contacts | Download providers, setup workspace |
| Provider | Specialist contractor | Plugin to talk to cloud services |
| `terraform plan` | Pre-construction inspection | Preview changes before applying |
| `terraform apply` | Construction begins | Create/modify/delete resources |
| `terraform destroy` | Demolition | Remove all managed infrastructure |
| State file | As-built record binder | Record of what Terraform created |
| Remote backend | Master binder in bank locker | Store state file remotely |
| State locking | Binder check-out system | Prevent simultaneous state writes |
| Resource | Each built element (wall, room, gate) | Individual infrastructure component |
| Variable | Customizable blank in template | Input parameter |
| Local | Internal calculations | Computed values for reuse |
| Output | Completion report details | Display important info after apply |
| Module | Standard room design template | Reusable configuration package |
| Data source | Looking up existing records | Read existing infrastructure info |
| Dependencies | Foundation before walls | Resource creation order |
| `depends_on` | "Do not start X until Y is done" | Explicit dependency declaration |
| `terraform fmt` | Format check on document | Auto-format code |
| `terraform validate` | Logic check on requirements | Check configuration validity |
| `terraform show` | Read complete as-built record | Show current state details |
| `terraform state list` | Table of contents of binder | List all tracked resources |
| `terraform import` | Add pre-existing structure to records | Bring existing resource under management |
| `terraform state rm` | Remove from records without demolishing | Stop tracking a resource |
| Workspace | Separate binder per property | Multiple environments, same config |
| `count` | "Install one fan per bedroom" | Create multiple of same resource |
| `for_each` | "Each room gets specific fan size" | Create resources from a map |
| Conditional | "If premium, use marble" | If-else logic in configuration |
| `lifecycle` | Special construction instructions | Control resource behavior |
| `create_before_destroy` | Build new before demolishing old | Zero-downtime replacement |
| `prevent_destroy` | "Never demolish main structure" | Block accidental deletion |
| `sensitive = true` | Sealed envelope for alarm PINs | Hide sensitive values from logs |
| `terraform refresh` | Fresh site inspection | Sync state with real world |
| TF_LOG | Full detailed activity log | Enable debug logging |

---

## 📋 Command Reference

### Setup Commands

| Command | Analogy | When to Run |
|---------|---------|-------------|
| `terraform init` | Site setup + contractor contacts | Once at start, or when providers change |

### Inspection Commands

| Command | Analogy | What It Does |
|---------|---------|-------------|
| `terraform fmt` | Format the requirements document | Auto-format code |
| `terraform validate` | Logic check | Check syntax and references |
| `terraform plan` | Pre-construction inspection | Preview changes |

### Execution Commands

| Command | Analogy | What It Does |
|---------|---------|-------------|
| `terraform apply` | Construction begins | Create/modify/delete resources |
| `terraform destroy` | Demolition | Remove all managed resources |

### State Commands

| Command | Analogy | What It Does |
|---------|---------|-------------|
| `terraform show` | Read complete as-built record | Show all state |
| `terraform state list` | Table of contents | List all tracked resources |
| `terraform state show` | Read one entry | Show one resource's details |
| `terraform import` | Add pre-existing to records | Adopt existing resource |
| `terraform state rm` | Remove from records | Stop tracking (no destroy) |
| `terraform refresh` | Fresh site inspection | Sync state with real world |

### Workspace Commands

| Command | Analogy | What It Does |
|---------|---------|-------------|
| `terraform workspace new` | New property project | Create workspace |
| `terraform workspace select` | Switch to a property | Switch workspace |
| `terraform workspace list` | See all properties | List workspaces |

### Troubleshooting

| Action | Analogy | What It Does |
|--------|---------|-------------|
| `TF_LOG=DEBUG` | Full activity log | Enable debug logging |
| `terraform plan -out=plan.tfplan` | Save inspection report | Save plan to file |
| `terraform apply plan.tfplan` | Execute saved plan | Apply exact plan |

---

## ✅ Workflow Checklist

```
EVERY TIME YOU MAKE CHANGES:
─────────────────────────────
□ 1. Write or update .tf files
□ 2. terraform fmt          (fix formatting)
□ 3. terraform validate     (check logic)
□ 4. terraform plan         (review what will change)
□ 5. Read plan carefully    (any surprises? any unexpected destroys?)
□ 6. terraform apply        (execute)
□ 7. Verify outputs         (are the results what you expected?)

BEFORE TERRAFORM DESTROY:
──────────────────────────
□ Are you absolutely sure?
□ Have you backed up any important data?
□ Are there other systems that depend on this?
□ This cannot be undone.
```
---
---
