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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/custom/button"

export default function SettingsAccount() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    image_url: "",
    phone_number_country_code: "",
    phone_number: "",
    department: "",
  })

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // discard handler
  const handleDiscard = () => {
    if (window.confirm("Are you sure to discard?")) {
      window.location.href = "/product"
    }
  }

  // save handler
  const handleSave = async () => {
    try {
      const { image_url, ...rest } = formData
      const payload = image_url ? { ...rest, image_url } : rest

      // Get token (example: from localStorage)
      const token = localStorage.getItem("authToken")

      await axios.post("https://mark-me-backend.onrender.com/faculty/registration", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      alert("Faculty saved successfully")
      window.location.href = "/product"
    } catch (error) {
      console.error(error)
      alert("Failed to save faculty")
    }
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col">
        {/* HEADER FIXED */}
        <div className="flex items-center gap-4 p-4 border-b shrink-0">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <a href="/faculty">
              <ChevronLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Faculty
          </h1>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" size="sm" onClick={handleDiscard}>
              Discard
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Faculty
            </Button>
          </div>
        </div>

        {/* SCROLLABLE FORM */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Faculty Details</CardTitle>
              <CardDescription>
                Enter the details of the faculty member below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Firstname + Lastname */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Image URL */}
                <div className="grid gap-3">
                  <Label htmlFor="image_url">Image URL (Optional)</Label>
                  <Input
                    id="image_url"
                    type="url"
                    placeholder="Enter image URL (optional)"
                    value={formData.image_url}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone Code + Phone Number */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="phone_number_country_code">
                      Phone Number Country Code
                    </Label>
                    <Input
                      id="phone_number_country_code"
                      type="text"
                      placeholder="+91"
                      value={formData.phone_number_country_code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      type="text"
                      placeholder="Enter phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="grid gap-3">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
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
              Save Faculty
            </Button>
          </div>
        </main>
      </div>
    </>
  )
}

