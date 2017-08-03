package mern_selenium;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class BugTrackerTest {
	WebDriver driver;
	WebElement element;
	
	@Before
	public void setup() {
		
		System.setProperty("webdriver.chrome.driver","C:\\Users\\Administrator\\Documents\\Java\\Selenium\\Selenium\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("http://localhost:8084/Bugtracker");
	}	
	
	public void wait(int time) {
		try {
			Thread.sleep(time);
		} catch (InterruptedException e) 
		{
			e.printStackTrace();
		}
	}
	
	@Test
	public void testCanOpenEdit() {
		System.out.println("Starting test");
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[1]/div/a/p")).click();
		wait(2000);
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[1]/div/a/p")).click();
		wait(2000);
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[3]/div[1]/div/div[2]/div[1]/div[1]/div[2]/button")).click();
		wait(2000);
		driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[3]/div[1]/div/div[2]/div[1]/div[1]/div[1]/div[7]/a/p")).click();
		wait(4000);
		try{
			element = driver.findElement(By.xpath("//*[@id=\"domMain\"]/div/div[1]/div/div/div[1]"));
			System.out.println("success");
		}catch (Exception e){
			 e.printStackTrace();
		}
		assertEquals(element.getText(), "Bug Details: -");
		System.out.println(element.getText());
		wait(4000);
		System.out.println("Ending Test");
	}
	
	
	@After
	public void cleanUp(){
		try {
			System.out.println("closing browser");
			driver.close();
		} catch (Exception ex) {
			System.out.println(ex.toString());
		}
	}
	
}
