$srcDir = "C:\Users\Admin\.gemini\antigravity-ide\brain\739c77d5-b1a1-4858-b4df-a350f4f7dc98"
$publicImages = "D:\web-service-homeone\public\images"

Add-Type -AssemblyName System.Drawing

function Save-OptimizedImage($src, $dst, $maxW, $maxH, $q) {
    $img = [System.Drawing.Image]::FromFile($src)
    $origW = $img.Width
    $origH = $img.Height
    
    $ratioW = $maxW / $origW
    $ratioH = $maxH / $origH
    $ratio = [Math]::Min($ratioW, $ratioH)
    if ($ratio -gt 1.0) { $ratio = 1.0 }
    
    $newW = [int]($origW * $ratio)
    $newH = [int]($origH * $ratio)
    
    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$q)
    
    if (Test-Path $dst) { Remove-Item $dst -Force }
    $bmp.Save($dst, $codec, $encoderParams)
    $bmp.Dispose()
    
    $len = (Get-Item $dst).Length
    Write-Host "Processed $dst - Size: $len bytes"
}

# Hero
Save-OptimizedImage "$srcDir\hero_web_service_1_1793248967600.jpg" "$publicImages\hero-1.jpg" 1600 900 82
Save-OptimizedImage "$srcDir\hero_web_service_2_1793248986351.jpg" "$publicImages\hero-2.jpg" 1600 900 82
Save-OptimizedImage "$srcDir\hero_web_service_3_1793249005479.jpg" "$publicImages\hero-3.jpg" 1600 900 82

# About
Save-OptimizedImage "$srcDir\about_main_team_1793249061428.jpg" "$publicImages\about1.jpg" 1200 900 85
Save-OptimizedImage "$srcDir\about_small_code_1793249093247.jpg" "$publicImages\about_small.jpg" 700 700 85

# Services
Save-OptimizedImage "$srcDir\service_details_code_1793249112629.jpg" "$publicImages\service-details.jpg" 1200 800 82
Save-OptimizedImage "$srcDir\service_mobile_app_1793249131482.jpg" "$publicImages\service-d1.jpg" 1000 700 82
Save-OptimizedImage "$srcDir\service_cloud_devops_1793249155134.jpg" "$publicImages\service-d2.jpg" 1000 700 82

# Avatars
Save-OptimizedImage "$srcDir\avatar_client_1_1793249178252.jpg" "$publicImages\1.jpg" 450 450 85
Save-OptimizedImage "$srcDir\avatar_client_2_1793249201333.jpg" "$publicImages\2.jpg" 450 450 85
Copy-Item "$publicImages\1.jpg" "$publicImages\3.jpg" -Force
Copy-Item "$publicImages\2.jpg" "$publicImages\4.jpg" -Force
Copy-Item "$publicImages\1.jpg" "$publicImages\1.png" -Force
Copy-Item "$publicImages\2.jpg" "$publicImages\2.png" -Force

Write-Host "All primary images processed and optimized successfully!"
