data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "validation" {
  bucket        = local.validation_bucket_name
  force_destroy = false

  tags = merge(local.common_tags, {
    Name    = local.validation_bucket_name
    Purpose = "validation"
  })
}

resource "aws_s3_bucket_versioning" "validation" {
  bucket = aws_s3_bucket.validation.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "validation" {
  bucket = aws_s3_bucket.validation.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "validation" {
  bucket = aws_s3_bucket.validation.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
