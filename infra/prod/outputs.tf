output "aws_account_id" {
  description = "AWS account used by Terraform."
  value       = data.aws_caller_identity.current.account_id
}

output "github_actions_role_arn" {
  description = "IAM role assumed by GitHub Actions."
  value       = local.github_actions_role
}

output "terraform_state_bucket_name" {
  description = "Remote backend bucket used for Terraform state."
  value       = local.state_bucket_name
}

output "validation_bucket_name" {
  description = "Validation bucket created by the main stack."
  value       = aws_s3_bucket.validation.bucket
}
