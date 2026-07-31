data "aws_caller_identity" "current" {}

module "s3_validation" {
  source = "../modules/s3-validation"

  bucket_name = local.validation_bucket_name
  common_tags = local.common_tags
}

module "secretsmanager_eventbrite" {
  source = "../modules/secretsmanager-eventbrite"

  secret_name = local.eventbrite_secret_name
  common_tags = local.common_tags
}

moved {
  from = aws_s3_bucket.validation
  to   = module.s3_validation.aws_s3_bucket.this
}

moved {
  from = aws_s3_bucket_versioning.validation
  to   = module.s3_validation.aws_s3_bucket_versioning.this
}

moved {
  from = aws_s3_bucket_server_side_encryption_configuration.validation
  to   = module.s3_validation.aws_s3_bucket_server_side_encryption_configuration.this
}

moved {
  from = aws_s3_bucket_public_access_block.validation
  to   = module.s3_validation.aws_s3_bucket_public_access_block.this
}

moved {
  from = aws_secretsmanager_secret.eventbrite
  to   = module.secretsmanager_eventbrite.aws_secretsmanager_secret.this
}
