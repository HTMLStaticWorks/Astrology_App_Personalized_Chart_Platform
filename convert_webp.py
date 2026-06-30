import os
from PIL import Image

IMAGES_DIR = r"assets\images"
images_to_convert = ["astrologer.png", "birth_chart.png", "cosmic_bg.png"]

def convert_images():
    print("Starting WebP conversion...")
    for filename in images_to_convert:
        input_path = os.path.join(IMAGES_DIR, filename)
        name, ext = os.path.splitext(filename)
        output_path = os.path.join(IMAGES_DIR, f"{name}.webp")
        
        if not os.path.exists(input_path):
            print(f"Error: {input_path} does not exist!")
            continue
            
        initial_size = os.path.getsize(input_path)
        
        # Open and convert image
        with Image.open(input_path) as img:
            # Save as WebP
            img.save(output_path, "WEBP", quality=85)
            
        final_size = os.path.getsize(output_path)
        reduction = (initial_size - final_size) / initial_size * 100
        print(f"Converted {filename} to {name}.webp:")
        print(f"  Original: {initial_size / 1024:.2f} KB")
        print(f"  WebP:     {final_size / 1024:.2f} KB ({reduction:.1f}% space saved)")
        
    print("Conversion complete.")

if __name__ == "__main__":
    convert_images()
