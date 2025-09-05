"use client"

import { useState } from "react"
import axios from "axios"
import { ChevronLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/ui/input"

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null)

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  // discard handler
  const handleDiscard = () => {
    if (window.confirm("Are you sure to discard?")) {
      window.location.href = "/student"
    }
  }

  // save handler
  const handleSave = async () => {
    if (!file) {
      alert("Please upload a CSV file first")
      return
    }

    try {
      const token = localStorage.getItem("authToken")

      // If API expects file upload (multipart/form-data):
      const formData = new FormData()
      formData.append("file", file)

      await axios.post("https://mark-me-backend.onrender.com/register/student/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      })

      alert("CSV uploaded successfully")
      window.location.href = "/student"
    } catch (error) {
      console.error(error)
      alert("Failed to upload CSV")
    }
  }

  return (
    <div className="flex h-screen w-full flex-col">
      {/* HEADER FIXED */}
      <div className="flex items-center gap-4 p-4 border-b shrink-0">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <a href="/student">
            <ChevronLeft className="h-4 w-4" />
          </a>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Upload Student CSV
        </h1>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" onClick={handleDiscard}>
            Discard
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save CSV
          </Button>
        </div>
      </div>

      {/* SCROLLABLE FORM */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload CSV</CardTitle>
            <CardDescription>
              Select a CSV file containing student details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="csvFile">CSV File</Label>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MOBILE SAVE BUTTON */}
        <div className="flex items-center justify-center gap-2 md:hidden mt-4">
          <Button variant="outline" size="sm" onClick={handleDiscard}>
            Discard
          </Button>
          <Button size="sm" onClick={handleSave}>
            Upload CSV
          </Button>
        </div>
      </main>
    </div>
  )
}
