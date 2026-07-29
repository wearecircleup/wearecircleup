from __future__ import annotations

from PIL import Image


def prepare_event_image(uploaded):
    if not uploaded:
        return None, None
    try:
        image = Image.open(uploaded).convert("RGB")
    except Exception:
        return None, "La imagen no es valida. Es opcional, asi que el borrador sigue sin ella."

    width, height = image.size
    if width <= 0 or height <= 0:
        return None, "La imagen no es valida. Es opcional, asi que el borrador sigue sin ella."

    current_ratio = width / height
    if abs(current_ratio - 2) <= 0.01:
        uploaded.seek(0)
        return image, None

    if current_ratio > 2:
        target_width = height * 2
        left = max(0, (width - target_width) // 2)
        image = image.crop((left, 0, left + target_width, height))
    else:
        target_width = width if width % 2 == 0 else width - 1
        target_height = max(1, target_width // 2)
        top = max(0, (height - target_height) // 2)
        image = image.crop((0, top, target_width, top + target_height))

    uploaded.seek(0)
    return image, (
        f"La imagen se ajusto automaticamente a 2:1. Ejemplos validos: 2400x1200 px, 1600x800 px, 1200x600 px. "
        f"Tu archivo original era {width}x{height} px."
    )
