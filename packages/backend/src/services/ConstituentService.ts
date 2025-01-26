import { Constituent } from '../models/Constituent'

class ConstituentService {
  private constituents: Map<string, Constituent> = new Map()

  listConstituents(): Constituent[] {
    return Array.from(this.constituents.values())
  }

  addOrUpdateConstituent(newConstituent: Constituent): void {
    const existing = this.constituents.get(newConstituent.email)
    if (existing) {
      // Merge existing data with new data
      this.constituents.set(newConstituent.email, {
        ...existing,
        ...newConstituent,
        signupTime: newConstituent.signupTime || existing.signupTime,
      })
    } else {
      this.constituents.set(newConstituent.email, newConstituent)
    }
  }

  exportConstituents(): string {
    // Implementation for CSV export
    // Returns a CSV string for now
    const csvRows = ['email,name,address,signupTime']
    for (const constituent of this.constituents.values()) {
      csvRows.push(
        `${constituent.email},${constituent.name},${
          constituent.address || ''
        },${constituent.signupTime}`
      )
    }
    return csvRows.join('\n')
  }
}

export default new ConstituentService()
