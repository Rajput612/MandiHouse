interface ProductRequest {
  id: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

class ProductRequestManager {
  private static readonly PRODUCT_REQUESTS_KEY = 'mandi_house_product_requests';

  // Get all product requests
  static getProductRequests(): ProductRequest[] {
    const requestsData = sessionStorage.getItem(this.PRODUCT_REQUESTS_KEY);
    return requestsData ? JSON.parse(requestsData) : [];
  }

  // Save product requests
  static setProductRequests(requests: ProductRequest[]): void {
    sessionStorage.setItem(this.PRODUCT_REQUESTS_KEY, JSON.stringify(requests));
  }

  // Add new product request
  static addRequest(request: Omit<ProductRequest, 'id' | 'status' | 'requestDate'>): ProductRequest {
    const requests = this.getProductRequests();
    const newRequest: ProductRequest = {
      ...request,
      id: `req_${Date.now()}`,
      status: 'pending',
      requestDate: new Date().toISOString(),
    };

    this.setProductRequests([...requests, newRequest]);
    return newRequest;
  }

  // Update request status
  static updateRequestStatus(
    requestId: string,
    status: 'approved' | 'rejected',
    reviewedBy: string,
    reviewNotes?: string
  ): boolean {
    const requests = this.getProductRequests();
    const requestIndex = requests.findIndex(r => r.id === requestId);

    if (requestIndex === -1) {
      return false;
    }

    const updatedRequests = [...requests];
    updatedRequests[requestIndex] = {
      ...updatedRequests[requestIndex],
      status,
      reviewDate: new Date().toISOString(),
      reviewedBy,
      reviewNotes
    };

    this.setProductRequests(updatedRequests);
    return true;
  }

  // Get requests by status
  static getRequestsByStatus(status: 'pending' | 'approved' | 'rejected'): ProductRequest[] {
    const requests = this.getProductRequests();
    return requests.filter(r => r.status === status);
  }

  // Get requests by user
  static getRequestsByUser(userId: string): ProductRequest[] {
    const requests = this.getProductRequests();
    return requests.filter(r => r.requestedBy === userId);
  }

  // Check if a similar request is pending
  static hasPendingRequest(productName: string): boolean {
    const requests = this.getProductRequests();
    return requests.some(r => 
      r.name.toLowerCase() === productName.toLowerCase() && 
      r.status === 'pending'
    );
  }
}

export default ProductRequestManager;
