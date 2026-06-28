---
title: "School → AWS Mapping Reference"
sidebar_position: 2
---

```
╔══════════════════════════════════════════════════════════════╗
║            COMPLETE SCHOOL ←→ AWS MAPPING                   ║
╠═══════════════════════════════╦══════════════════════════════╣
║    SCHOOL CONCEPT             ║    AWS CONCEPT               ║
╠═══════════════════════════════╬══════════════════════════════╣
║ International School System   ║ AWS (Cloud Platform)         ║
║ School Account/Enrollment     ║ AWS Account                  ║
║ City Campus                   ║ Region                       ║
║ Campus Building               ║ Availability Zone            ║
║ Campus Boundary/Walls         ║ VPC                          ║
║ Campus Wing/Section           ║ Subnet                       ║
║ Public Wing (Science Lab)     ║ Public Subnet                ║
║ Private Wing (Admin Block)    ║ Private Subnet               ║
║ Student ID Number Range       ║ CIDR Block (IP Range)        ║
║ Campus Direction Signboards   ║ Route Table                  ║
║ Main Entrance Gate            ║ Internet Gateway             ║
║ Staff Side Exit Door          ║ NAT Gateway                  ║
║ Room Door Security Guard      ║ Security Group               ║
║ Wing Entrance Guard           ║ Network ACL                  ║
║ Student (doing actual work)   ║ EC2 Instance                 ║
║ Student's Capabilities        ║ Instance Type (t3, m5, etc.) ║
║ Student's Locker              ║ EBS Volume                   ║
║ Library (shared by all)       ║ EFS (Elastic File System)    ║
║ Central Document Storage      ║ S3 (Simple Storage Service)  ║
║ School ID Management System   ║ IAM                          ║
║ Student ID Card               ║ IAM User                     ║
║ Department (Science, Arts)    ║ IAM Group                    ║
║ Student Permission Slip       ║ IAM Policy                   ║
║ Temporary Visitor Badge       ║ IAM Role                     ║
║ School Principal (all access) ║ Root Account                 ║
║ Student Report Card           ║ CloudWatch Metrics           ║
║ School Attendance Register    ║ CloudTrail (Audit Logs)      ║
║ School Directory              ║ Route 53 (DNS)               ║
║ School Receptionist           ║ Elastic Load Balancer        ║
║ Hiring more students on demand║ Auto Scaling                 ║
║ Annual school enrollment plan ║ Reserved Instances           ║
╚═══════════════════════════════╩══════════════════════════════╝
```

---
