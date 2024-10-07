import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class Sort {
	static long comparisons = 0;
	static long swaps = 0;

	public static void main(String[] args) 
	{
		int size = 10;
	
		try 
		{
            FileReader fr = new FileReader("sortme100000.txt");
            BufferedReader br = new BufferedReader(fr);
            String line;
            int[] numList = new int[size];
            int index = 0;
            while ((line = br.readLine()) != null && index < size) 
            {
                numList[index] = Integer.parseInt(line);
                index++;
            }
            br.close();

            printlist(numList);
            long startTime = System.nanoTime();
            
            numList = insertionSort(numList, size);
            //numList = bubbleSort(numList, size);
            //numList = selectionSort(numList, size);
            //numList = mergeSort(numList, size);
            //numList = quickSort(numList, 0, size - 1);
            //numList = heapSort(numList, size);
            

            long endTime = System.nanoTime();
            long elapsedTime = endTime - startTime;

            if (elapsedTime < 1000000) {
                System.out.printf("FINAL LIST: %d Nanoseconds\n", elapsedTime);
            } else {
                System.out.printf("FINAL LIST: %.2f Milliseconds\n", elapsedTime / 1000000.0);
            }

            System.out.println("Comparisons: " + comparisons + "\nSwaps: " + swaps);
            printlist(numList);
            
        } 
		catch (IOException e) 
		{
            System.out.println("File read error");
        }
    }

	public static int[] bubbleSort(int[] numList, int size) {
		
		long comparisons = 0;
		long swaps = 0;	
		
		for (int i = 0; i < size - 1; i++) {
			for (int j = 0; j < ((size - 1) - i); j++) {
				comparisons++;
				if (numList[j] > numList[j + 1]) {
					swaps++;
					int temp = numList[j + 1];
					numList[j + 1] = numList[j];
					numList[j] = temp;
				}
			}
			// printlist(numList);
		}
		
		System.out.println("Comparisons: " + comparisons + "\nSwaps: " + swaps);

		return numList;
	}
	
	public static int[] insertionSort(int[] numList, int size) {
		
		long comparisons = 0;
		long swaps = 0;	
		
		for (int i = 0; i < size; i++) 
		{
			int temp = numList[i];
			int j = i - 1;
			
			while (j >= 0 && numList[j] > temp) 
			{
				numList[j + 1] = numList[j];
				j--;
				swaps++;
			}
			
			numList[j + 1] = temp;
			swaps++;
			// printlist(numList);
		}
		
		System.out.println("Comparisons: " + comparisons + "\nSwaps: " + swaps);

		return numList;
	}
	
	public static int[] selectionSort(int[] numList, int size) {
		
		long comparisons = 0;
		long swaps = 0;
		
		for(int i = 0; i < size - 1; i++) 
		{			
			int min = i;
			for(int j = i + 1; j < size; j++) 
			{
				comparisons++;
				if(numList[min] > numList[j])
				{
					swaps++;
					min = j;
				}
			}
			
			int temp = numList[i];
			numList[i] = numList[min];
			numList[min] = temp;
			
		}
		
		System.out.println("Comparisons: " + comparisons + "\nSwaps: " + swaps);
		
		return numList;
		
	}
	
	public static int[] mergeSort(int[] numList, int size) {
		
		if (size < 2) {
			return numList;
		}
		
		int half = size / 2;
		int[] leftSide = new int[half];
		int[] rightSide = new int[size - half];
		
		int j = 0;
		for (int i = 0; i < size ; i++)
		{
			if(i < half) 
			{
				leftSide[i] = numList[i];
			}
			else
			{
				rightSide[j] = numList[i];
				j++;
			}
		}
		mergeSort(leftSide, half);
		mergeSort(rightSide, size - half);
		merge(leftSide, rightSide, numList);
		
		return numList;
		
	}
	
	public static int[] quickSort(int[] numList, int start, int end) {
		
		if(end <= start)
		{
			return numList;
		}
		
		int pivot = partition(numList, start, end);
		quickSort(numList, start, pivot - 1);
		quickSort(numList, pivot + 1, end);
		
		return numList;
		
	}
	
	public static void merge(int[] leftSide, int[] rightSide, int[] array)
	{
		int sizeLeft = leftSide.length;
		int sizeRight = rightSide.length;
		int i = 0, l = 0, r = 0;
		
		while (l < sizeLeft && r < sizeRight) 
		{
			comparisons++;
			if(leftSide[l] < rightSide[r])
			{
				array[i] = leftSide[l];
				l++;
			}
			else 
			{
				array[i] = rightSide[r];
				r++;
				swaps++;
			}
			
			i++;
		}
		
		while(l < sizeLeft)
		{
			array[i] = leftSide[l];
			i++;
			l++;
		}
		
		while(r < sizeRight)
		{
			array[i] = rightSide[r];
			i++;
			r++;
		}
	}
	
	public static int partition(int[] numList, int start, int end) {

		int pivot = numList[end];
		int i = start - 1;
		
		for(int j = start; j <= end - 1; j++)
		{
			comparisons++;
			if(numList[j] < pivot)
			{
				i++;
				int temp = numList[i];
				numList[i] = numList[j];
				numList[j] = temp;
				swaps++;
			}
		}
		i++;
		int temp = numList[i];
		numList[i] = numList[end];
		numList[end] = temp;
		
		return i;
	}

	public static void printlist(int[] numList) {
		for (int i = 0; i < numList.length; i++) {
			System.out.print(numList[i] + " ");
		}
		System.out.println("");
	}
	
	public static int[] heapSort(int[] numList, int size) {
	    long comparisons = 0;
	    long swaps = 0;

	    // Build the heap
	    for (int i = size / 2 - 1; i >= 0; i--) {
	        heapify(numList, size, i);
	    }

	    // Extract elements from the heap one by one
	    for (int i = size - 1; i > 0; i--) {
	        // Swap the root (maximum element) with the last element
	        int temp = numList[0];
	        numList[0] = numList[i];
	        numList[i] = temp;
	        swaps++;

	        // Heapify the reduced heap
	        heapify(numList, i, 0);
	    }

	    return numList;
	}

	private static void heapify(int[] numList, int size, int i) {
	    int largest = i;
	    int left = 2 * i + 1;
	    int right = 2 * i + 2;

	    // Check if the left child is larger than the root
	    if (left < size && numList[left] > numList[largest]) {
	        largest = left;
	    }
	    comparisons++;

	    // Check if the right child is larger than the current largest
	    if (right < size && numList[right] > numList[largest]) {
	        largest = right;
	    }
	    comparisons++;

	    // If the largest element is not the root, swap and heapify the affected subtree
	    if (largest != i) {
	        int temp = numList[i];
	        numList[i] = numList[largest];
	        numList[largest] = temp;
	        swaps++;

	        heapify(numList, size, largest);
	    }

	}
}
