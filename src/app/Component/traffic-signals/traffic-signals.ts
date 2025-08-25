import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Traffic } from '../../models/traffic-signal.model';

@Component({
  selector: 'app-traffic-signals',
  imports: [CommonModule, FormsModule],
  templateUrl: './traffic-signals.html',
  styleUrls: ['./traffic-signals.css'],
})
export class TrafficSignalsComponent implements OnInit, OnDestroy {
  // ================= Pagination =================
  pageSize = 10;
  currentPage = 1;

  // ================= Popup =================
  hoveredTraffic: Traffic | null = null;
  popupVisible = false;
  popupX = 0;
  popupY = 0;
  popupData: Traffic | null = null;

  //
  currentStatus: 'RED' | 'GREEN' | 'YELLOW' = 'RED';

  // الحالة العكسية (للعمود التاني)
  get oppositeStatus(): 'RED' | 'GREEN' | 'YELLOW' {
    if (this.currentStatus === 'RED') return 'GREEN';
    if (this.currentStatus === 'GREEN') return 'RED';
    return 'YELLOW';
  }
  // ================= Counters =================
  counters: Record<'RED' | 'GREEN' | 'YELLOW', number> = {
    RED: 0,
    GREEN: 0,
    YELLOW: 0,
  };
  private counterInterval: any;

  duration = 10;
  interval: any;

  // ================= Filters =================
  searchTerm = '';
  statusFilter: { [key: string]: boolean } = {
    RED: true,
    GREEN: true,
    YELLOW: true,
  };
  activeFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';
  showStatusFilter = false;
  showActiveFilter = false;

  // ================= Table Headers =================
  tableHeaders: string[] = ['ID', 'IP Address', 'Traffic Name', 'Active'];

  // ================= Colors / Labels =================
  statusColors: { [key: string]: string } = {
    RED: '#ff4757',
    GREEN: '#2ed573',
    YELLOW: '#ffa502',
  };
  activeLabel = 'Active';
  inactiveLabel = 'Inactive';

  // ================= Traffic Data =================
  traffics: Traffic[] = [
    {
      id: 1,
      ipAddress: '192.168.1.101',
      name: 'Tahrir Square - Downtown Cairo',
      status: 'RED',
      active: true,
    },
    {
      id: 2,
      ipAddress: '192.168.1.102',
      name: '6th of October Bridge Entrance',
      status: 'GREEN',
      active: false,
    },
    {
      id: 3,
      ipAddress: '192.168.1.103',
      name: 'Nasr City - Abbas El Akkad',
      status: 'YELLOW',
      active: true,
    },
    {
      id: 4,
      ipAddress: '192.168.1.104',
      name: 'Ramses Square - Downtown',
      status: 'GREEN',
      active: true,
    },
    {
      id: 5,
      ipAddress: '192.168.1.105',
      name: 'Alexandria Desert Road Junction',
      status: 'YELLOW',
      active: false,
    },
    {
      id: 6,
      ipAddress: '192.168.1.106',
      name: 'Mohamed Naguib Square - Heliopolis',
      status: 'RED',
      active: true,
    },
    {
      id: 7,
      ipAddress: '192.168.1.107',
      name: 'Corniche El Nile - Zamalek',
      status: 'GREEN',
      active: false,
    },
    {
      id: 8,
      ipAddress: '192.168.1.108',
      name: 'Ring Road - Maadi Exit',
      status: 'RED',
      active: true,
    },
    {
      id: 9,
      ipAddress: '192.168.1.109',
      name: 'El Hegaz Square - Heliopolis',
      status: 'YELLOW',
      active: true,
    },
    {
      id: 10,
      ipAddress: '192.168.1.110',
      name: 'Giza Square - Pyramids Road',
      status: 'GREEN',
      active: true,
    },
    {
      id: 11,
      ipAddress: '192.168.1.111',
      name: 'City Stars Intersection - Nasr City',
      status: 'RED',
      active: false,
    },
    {
      id: 12,
      ipAddress: '192.168.1.112',
      name: 'Alexandria Corniche - Stanley',
      status: 'GREEN',
      active: true,
    },
    {
      id: 13,
      ipAddress: '192.168.1.113',
      name: 'Suez Road - Ain Sokhna Entrance',
      status: 'YELLOW',
      active: false,
    },
    {
      id: 14,
      ipAddress: '192.168.1.114',
      name: 'Mokattam Hills Intersection',
      status: 'RED',
      active: true,
    },
    {
      id: 15,
      ipAddress: '192.168.1.115',
      name: 'El Marg Road - Northern Cairo',
      status: 'GREEN',
      active: false,
    },
    {
      id: 16,
      ipAddress: '192.168.1.116',
      name: 'Maadi Corniche Intersection',
      status: 'YELLOW',
      active: true,
    },
    {
      id: 17,
      ipAddress: '192.168.1.117',
      name: 'El Obour City Main Junction',
      status: 'RED',
      active: true,
    },
    {
      id: 18,
      ipAddress: '192.168.1.118',
      name: 'Port Said Road - Ismailia Junction',
      status: 'GREEN',
      active: true,
    },
    {
      id: 19,
      ipAddress: '192.168.1.119',
      name: 'New Cairo - AUC Intersection',
      status: 'YELLOW',
      active: false,
    },
    {
      id: 20,
      ipAddress: '192.168.1.120',
      name: 'Alexandria International Airport Road',
      status: 'RED',
      active: true,
    },
  ];

  // ================= Lifecycle =================
  ngOnInit() {}
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // ================= Popup Logic =================
  showPopup(traffic: Traffic, event: MouseEvent) {
    this.popupData = traffic;
    this.popupVisible = true;

    this.updatePopupPosition(event);

    this.startCounter();
  }

  hidePopup() {
    this.popupVisible = false;
    this.popupData = null;

    // Stop counter
    clearInterval(this.interval);
  }

  movePopup(event: MouseEvent) {
    const popupWidth = 220;
    const popupHeight = 180;
    const offset = 10;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    if (x + popupWidth > viewportWidth) {
      x = event.clientX - popupWidth - offset;
    }

    if (y + popupHeight > viewportHeight) {
      y = event.clientY - popupHeight - offset;
    }

    this.popupX = x + window.scrollX;
    this.popupY = y + window.scrollY;
  }

  // hidePopup() {
  //   this.popupVisible = false;
  //   this.popupData = null;

  //   // Stop counter
  //   if (this.counterInterval) {
  //     clearInterval(this.counterInterval);
  //     this.counterInterval = null;
  //   }
  // }

  private updatePopupPosition(event: MouseEvent) {
    const padding = 15;
    const popupWidth = 250;
    const popupHeight = 180;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX + padding;
    let y = event.clientY + padding;

    // ✅ لو البوب-اب هيطلع برا الشاشة من اليمين
    if (x + popupWidth > viewportWidth) {
      x = event.clientX - popupWidth - padding;
      if (x < 0) x = viewportWidth - popupWidth - padding; // fallback لو ضاق قوي
    }

    // ✅ لو البوب-اب هيطلع برا الشاشة من تحت
    if (y + popupHeight > viewportHeight) {
      y = event.clientY - popupHeight - padding;
      if (y < 0) y = viewportHeight - popupHeight - padding; // fallback لو ضاق قوي
    }

    // ✅ ضمان إن البوب-اب مش يخرج برا الشمال أو فوق
    if (x < 0) x = padding;
    if (y < 0) y = padding;

    this.popupX = x;
    this.popupY = y;
  }

  // movePopup(event: MouseEvent) {
  //   this.popupX = event.pageX + 15;
  //   this.popupY = event.pageY + 15;
  // }

  // hidePopup() {
  //   this.popupVisible = false;
  //   this.popupData = null;
  //   clearInterval(this.interval);
  // }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.status-filter-dropdown')) this.showStatusFilter = false;
    if (!target.closest('.active-filter-dropdown')) this.showActiveFilter = false;
  }

  // ================= Counter Logic =================
  private resetCounters() {
    this.counters = { RED: 0, GREEN: 0, YELLOW: 0 };
    if (this.popupData) this.counters[this.popupData.status] = this.duration;
  }

  startCounter() {
    clearInterval(this.interval);

    // reset counters
    this.counters = { RED: 0, GREEN: 0, YELLOW: 0 };
    this.counters[this.currentStatus] = this.duration;

    this.interval = setInterval(() => {
      this.counters[this.currentStatus]--;

      if (this.counters[this.currentStatus] <= 0) {
        this.switchStatus(this.nextStatus(this.currentStatus));
      }
    }, 1000);
  }

  private nextStatus(current: 'RED' | 'GREEN' | 'YELLOW'): 'RED' | 'GREEN' | 'YELLOW' {
    const order: ('RED' | 'GREEN' | 'YELLOW')[] = ['RED', 'GREEN', 'YELLOW'];
    return order[(order.indexOf(current) + 1) % order.length];
  }

  switchStatus(nextStatus: 'RED' | 'GREEN' | 'YELLOW') {
    this.currentStatus = nextStatus;
    this.startCounter();
  }

  // ================= Filters Logic =================
  get filteredTraffics(): Traffic[] {
    return this.traffics.filter((traffic) => {
      const matchesSearch =
        traffic.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        traffic.id.toString().includes(this.searchTerm);
      const matchesStatus = this.statusFilter[traffic.status];
      const matchesActive =
        this.activeFilter === 'ALL' ||
        (this.activeFilter === 'ACTIVE' && traffic.active) ||
        (this.activeFilter === 'INACTIVE' && !traffic.active);

      return matchesSearch && matchesStatus && matchesActive;
    });
  }

  toggleStatusFilter(status: string) {
    this.statusFilter[status] = !this.statusFilter[status];
  }

  toggleAllStatusFilters() {
    const allSelected = this.allStatusSelected;
    Object.keys(this.statusFilter).forEach(
      (key) => (this.statusFilter[key as 'RED' | 'GREEN' | 'YELLOW'] = !allSelected)
    );
  }

  get allStatusSelected(): boolean {
    return Object.values(this.statusFilter).every((v) => v);
  }

  get someStatusSelected(): boolean {
    return Object.values(this.statusFilter).some((v) => v) && !this.allStatusSelected;
  }

  toggleStatusFilterDropdown() {
    this.showStatusFilter = !this.showStatusFilter;
    if (this.showStatusFilter) this.showActiveFilter = false;
  }

  toggleActiveFilterDropdown() {
    this.showActiveFilter = !this.showActiveFilter;
    if (this.showActiveFilter) this.showStatusFilter = false;
  }

  // ================= Pagination Logic =================
  get paginatedTraffics(): Traffic[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTraffics.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTraffics.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // ================= Misc =================
  toggleActive(traffic: Traffic) {
    traffic.active = !traffic.active;
  }
}
