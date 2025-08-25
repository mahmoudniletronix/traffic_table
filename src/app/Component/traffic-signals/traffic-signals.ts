import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Traffic } from '../../models/traffic-signal.model';

@Component({
  selector: 'app-traffic-signals',
  imports: [CommonModule, FormsModule],
  templateUrl: './traffic-signals.html',
  styleUrls: ['./traffic-signals.css'],
})
export class TrafficSignalsComponent {
  // Pagination properties
  pageSize: number = 10;
  currentPage: number = 1;

  hoveredTraffic: Traffic | null = null;
  popupPosition = { x: 0, y: 0 };
  popupVisible: boolean = false;
  popupX: number = 0;
  popupY: number = 0;
  popupData: any = null;

  showPopup(traffic: any, event: MouseEvent) {
    this.popupData = traffic;
    this.popupVisible = true;
    this.movePopup(event);
  }

  movePopup(event: MouseEvent) {
    this.popupX = event.pageX + 15;
    this.popupY = event.pageY + 15;
  }

  hidePopup() {
    this.popupVisible = false;
    this.popupData = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.hoveredTraffic) {
      this.popupPosition.x = event.pageX + 15;
      this.popupPosition.y = event.pageY + 15;
    }
    const target = event.target as HTMLElement;

    if (!target.closest('.status-filter-dropdown')) {
      this.showStatusFilter = false;
    }

    if (!target.closest('.active-filter-dropdown')) {
      this.showActiveFilter = false;
    }
  }
  rightStatus(traffic: Traffic): 'RED' | 'GREEN' {
    return traffic.status === 'RED' ? 'RED' : 'GREEN';
  }

  leftStatus(traffic: Traffic): 'RED' | 'GREEN' {
    return this.rightStatus(traffic) === 'RED' ? 'GREEN' : 'RED';
  }

  searchTerm: string = '';
  statusFilter: { [key: string]: boolean } = {
    RED: true,
    GREEN: true,
    YELLOW: true,
  };
  activeFilter: string = 'ALL';
  showStatusFilter: boolean = false;
  showActiveFilter: boolean = false;

  tableHeaders: string[] = ['ID', 'IP Address', 'Traffic Name', 'Active'];

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
      name: 'New Cairo - American University Intersection',
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
    {
      id: 21,
      ipAddress: '192.168.2.101',
      name: 'Luxor - Karnak Temple Road',
      status: 'GREEN',
      active: true,
    },
    {
      id: 22,
      ipAddress: '192.168.2.102',
      name: 'Aswan - High Dam Road',
      status: 'YELLOW',
      active: false,
    },
    {
      id: 23,
      ipAddress: '192.168.2.103',
      name: 'Sharm El Sheikh - Naama Bay',
      status: 'RED',
      active: true,
    },
    {
      id: 24,
      ipAddress: '192.168.2.104',
      name: 'Hurghada - Sheraton Road',
      status: 'GREEN',
      active: false,
    },
    {
      id: 25,
      ipAddress: '192.168.2.105',
      name: 'Mansoura - University Street',
      status: 'YELLOW',
      active: true,
    },
    {
      id: 26,
      ipAddress: '192.168.2.106',
      name: 'Tanta - El Geish Street',
      status: 'RED',
      active: true,
    },
    {
      id: 27,
      ipAddress: '192.168.2.107',
      name: 'Mahalla - Industrial Zone Entrance',
      status: 'GREEN',
      active: true,
    },
    {
      id: 28,
      ipAddress: '192.168.2.108',
      name: 'Damietta - Corniche Road',
      status: 'YELLOW',
      active: false,
    },
    {
      id: 29,
      ipAddress: '192.168.2.109',
      name: 'Ismailia - Mohamed Ali Quay',
      status: 'RED',
      active: true,
    },
    {
      id: 30,
      ipAddress: '192.168.2.110',
      name: 'Suez - Port Entrance',
      status: 'GREEN',
      active: true,
    },
  ];
  statusColors: { [key: string]: string } = {
    RED: '#ff4757',
    GREEN: '#2ed573',
    YELLOW: '#ffa502',
  };

  activeLabel: string = 'Active';
  inactiveLabel: string = 'Inactive';

  get filteredTraffics(): Traffic[] {
    return this.traffics.filter((traffic) => {
      const matchesSearch =
        traffic.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        traffic.id.toString().includes(this.searchTerm);
      const matchesStatus = this.statusFilter[traffic.active ? 'GREEN' : 'RED'];
      const matchesActive =
        this.activeFilter === 'ALL' ||
        (this.activeFilter === 'ACTIVE' && traffic.active) ||
        (this.activeFilter === 'INACTIVE' && !traffic.active);
      return matchesSearch && matchesStatus && matchesActive;
    });
  }

  get paginatedTraffics(): Traffic[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTraffics.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTraffics.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get allStatusSelected(): boolean {
    return Object.values(this.statusFilter).every((value) => value);
  }

  get someStatusSelected(): boolean {
    return Object.values(this.statusFilter).some((value) => value) && !this.allStatusSelected;
  }

  toggleActive(traffic: Traffic) {
    traffic.active = !traffic.active;
  }

  changeStatus(traffic: Traffic) {
    const order: ('RED' | 'GREEN' | 'YELLOW')[] = ['RED', 'GREEN', 'YELLOW'];
    const index = order.indexOf(traffic.active ? 'GREEN' : 'RED');
    traffic.name = order[(index + 1) % order.length];
  }

  toggleStatusFilter(status: string) {
    this.statusFilter[status] = !this.statusFilter[status];
  }

  toggleAllStatusFilters() {
    const allSelected = this.allStatusSelected;
    Object.keys(this.statusFilter).forEach((key) => {
      this.statusFilter[key] = !allSelected;
    });
  }

  toggleStatusFilterDropdown() {
    this.showStatusFilter = !this.showStatusFilter;
    if (this.showStatusFilter) this.showActiveFilter = false;
  }

  toggleActiveFilterDropdown() {
    this.showActiveFilter = !this.showActiveFilter;
    if (this.showActiveFilter) this.showStatusFilter = false;
  }
}
